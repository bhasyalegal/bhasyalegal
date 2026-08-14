import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  Html,
  Preload,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

type RenderTier = "efficient" | "balanced" | "premium";

type RenderSettings = {
  shadowMapSize: number;
  useHDRI: boolean;
  usePostFX: boolean;
  useShadows: boolean;
  antialias: boolean;
  precision: "mediump" | "highp";
  dpr: [number, number];
};

const RENDER_SETTINGS: Record<RenderTier, RenderSettings> = {
  efficient: {
    shadowMapSize: 512,
    useHDRI: true,
    usePostFX: false,
    useShadows: false,
    antialias: true,
    precision: "highp",
    dpr: [1, 2],
  },
  balanced: {
    shadowMapSize: 1024,
    useHDRI: true,
    usePostFX: false,
    useShadows: true,
    antialias: true,
    precision: "highp",
    dpr: [1, 1.5],
  },
  premium: {
    shadowMapSize: 2048,
    useHDRI: true,
    usePostFX: true,
    useShadows: true,
    antialias: true,
    precision: "highp",
    dpr: [1, 2],
  },
};

function useRenderTier(containerRef: React.RefObject<HTMLElement>): RenderTier {
  const [tier, setTier] = useState<RenderTier>("premium");

  useEffect(() => {
    const tierForWidth = (w: number): RenderTier => {
      if (w < 640) return "efficient";
      if (w < 1280) return "balanced";
      return "premium";
    };

    const node = containerRef.current;

    // Measure the statue's own container rather than the whole window, so
    // the render tier reflects how much space this component actually gets
    // on the current device — still correct if it's ever embedded somewhere
    // narrower than the full viewport (a split layout, a card, etc).
    if (node && typeof ResizeObserver !== "undefined") {
      setTier(tierForWidth(node.getBoundingClientRect().width || window.innerWidth));
      const observer = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width;
        if (width) setTier(tierForWidth(width));
      });
      observer.observe(node);
      return () => observer.disconnect();
    }

    // Fallback for browsers without ResizeObserver, or if this runs before
    // the container ref has mounted.
    const compute = () => setTier(tierForWidth(window.innerWidth));
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [containerRef]);

  return tier;
}

function usePointerState() {
  const state = useRef({ x: 0, y: 0, lastMove: performance.now() });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      state.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      state.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      state.current.lastMove = performance.now();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return state;
}

function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);
  return isTouch;
}

// Browsers don't expose an exact Windows device model the way they do on
// Android, so "Surface Pro" can't be detected with certainty. This is a
// best-effort heuristic (Windows + multi-touch, refined by UA Client Hints
// where the browser supports them) — it may also match other touch-enabled
// Windows 2-in-1 laptops, so treat it as "probably a Surface Pro" rather
// than a guarantee.
function useIsSurfacePro(): boolean {
  const [isSurfacePro, setIsSurfacePro] = useState(false);
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isWindows = /Windows NT/i.test(ua);
    const hasMultiTouch =
      typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;
    setIsSurfacePro(isWindows && hasMultiTouch);

    const uaData = (navigator as any)?.userAgentData;
    if (uaData?.getHighEntropyValues) {
      uaData
        .getHighEntropyValues(["model"])
        .then((values: { model?: string }) => {
          if (values.model && /surface pro/i.test(values.model)) {
            setIsSurfacePro(true);
          }
        })
        .catch(() => {});
    }
  }, []);
  return isSurfacePro;
}

// Reads device tilt via the Device Orientation API into a ref (not state) so
// useFrame can sample it every tick without triggering React re-renders.
// iOS only grants motion/orientation access from inside a user gesture, so
// `requestPermission` is exposed separately for a click/tap handler to call.
function useDeviceTilt(enabled: boolean) {
  const tilt = useRef({ x: 0, y: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  const needsPermission =
    typeof window !== "undefined" &&
    typeof (window as any).DeviceOrientationEvent !== "undefined" &&
    typeof (window as any).DeviceOrientationEvent.requestPermission === "function";

  useEffect(() => {
    if (!enabled || (needsPermission && !permissionGranted)) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // gamma: left-right tilt (-90..90). beta: front-back tilt (-180..180) —
      // ~45° is a natural resting angle for a handheld phone/tablet, so that
      // is treated as neutral rather than 0.
      const gamma = THREE.MathUtils.clamp(e.gamma ?? 0, -45, 45);
      const beta = THREE.MathUtils.clamp((e.beta ?? 45) - 45, -45, 45);
      tilt.current.x = gamma / 45;
      tilt.current.y = beta / 45;
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [enabled, needsPermission, permissionGranted]);

  const requestPermission = async () => {
    if (!needsPermission || permissionGranted) return;
    try {
      const result = await (window as any).DeviceOrientationEvent.requestPermission();
      if (result === "granted") setPermissionGranted(true);
    } catch {
      // Denied, or called outside a user gesture — fail silently and leave
      // the statue static rather than throwing.
    }
  };

  return { tilt, requestPermission };
}


function useDesktopDragRotation(enabled: boolean) {
  const rotation = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const beginDrag = (e: any) => {
    if (!enabled) return;
    dragging.current = true;
    moved.current = false;
    last.current.x = e.clientX;
    last.current.y = e.clientY;
    e.stopPropagation();
    e.target?.setPointerCapture?.(e.pointerId);
  };

  const drag = (e: any) => {
    if (!enabled || !dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      moved.current = true;
    }

    rotation.current.y += dx * 0.012;
    rotation.current.x += dy * 0.007;
    rotation.current.x = THREE.MathUtils.clamp(
      rotation.current.x,
      -THREE.MathUtils.degToRad(12),
      THREE.MathUtils.degToRad(12)
    );

    last.current.x = e.clientX;
    last.current.y = e.clientY;
    e.stopPropagation();
  };

  const endDrag = (e?: any) => {
    if (!enabled) return;
    dragging.current = false;
    e?.target?.releasePointerCapture?.(e.pointerId);
    e?.stopPropagation?.();
  };

  const consumeClick = () => {
    const wasDragged = moved.current;
    moved.current = false;
    return wasDragged;
  };

  return { rotation, beginDrag, drag, endDrag, consumeClick };
}

const MODEL_URL = "/models/lady-justice.glb";
const TARGET_HEIGHT = 3.2;

useGLTF.preload(MODEL_URL);

type PointerRef = React.MutableRefObject<{ x: number; y: number; lastMove: number }>;

const PEDESTAL = {
  topRadius: 0.95,
  bottomRadius: 1.08,
  height: 0.32,
  centerY: -0.16,
};

const GROUND_Y = -1.8;
const ASSEMBLY_OFFSET_Y = GROUND_Y - (PEDESTAL.centerY - PEDESTAL.height / 2);

const CAMERA_FOV_DEG = 32;
const TARGET_VERTICAL_COVERAGE = 0.70; // Forces statue to take up exactly 70% of screen height
// Ceiling on how much of the viewport WIDTH the statue may fill. Only kicks in
// on unusually narrow/tall viewports (foldable cover screens, a browser window
// resized very narrow, split-screen multitasking) where fitting to height
// alone would let the statue overflow the sides. Tune like the coverage value
// above if you want it snugger or looser on those devices.
const TARGET_HORIZONTAL_COVERAGE = 0.88;
const VERTICAL_BIAS = 0;
const ENTRANCE_ZOOM_FACTOR = 1.4;

// Compositional Y shifts applied on top of the fixed camera frame (camera target
// doesn't move, so these just slide the statue up/down within the shot).
// Roughly, 0.05 units ≈ 1% of screen height at the default fit distance —
// nudge these to match the exact framing you want.
const DESKTOP_Y_OFFSET = -3; // existing desktop framing + exactly 1 inch lower
const MOBILE_Y_OFFSET = 0.29;

// Below this canvas width: full mobile composition. At/above this width: full
// desktop composition. In between (the typical tablet range), the two offsets
// above are blended smoothly so rotating a tablet or resizing the window
// doesn't pop the statue's position.
const MOBILE_WIDTH_BREAKPOINT = 640;
const DESKTOP_WIDTH_BREAKPOINT = 1024;

// Assumes the glTF model (and this scene) are authored in meters, the
// glTF/Three.js convention. If "an inch" ends up looking too small or too
// large for your asset's actual scale, this is the constant to adjust.
const INCH_IN_SCENE_UNITS = 0.0254;
const SURFACE_PRO_Y_LIFT = INCH_IN_SCENE_UNITS; // ~1 inch upward, specifically for Surface Pro

// How far the statue turns/nods in response to device tilt. Yaw covers a
// similar range to the old drag-to-rotate; pitch stays subtle, matching the
// old OrbitControls polar-angle limit (±0.10 rad) so it never looks like
// the statue is toppling forward/back.
const MAX_TILT_YAW = THREE.MathUtils.degToRad(22);
const MAX_TILT_PITCH = THREE.MathUtils.degToRad(6);
const TILT_SMOOTHING = 0.0008;

type FrameBox = { width: number; height: number; centerY: number };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Smooth 0→1 ramp between edge0 and edge1, used to blend a framing value
// across a breakpoint range instead of flipping it at a single width.
function smoothstep(x: number, edge0: number, edge1: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function getCombinedFrameBox(statueWidth: number): FrameBox {
  const statueTop = TARGET_HEIGHT;
  const statueBottom = 0;
  const pedestalTop = PEDESTAL.centerY + PEDESTAL.height / 2;
  const pedestalBottom = PEDESTAL.centerY - PEDESTAL.height / 2;

  const top = Math.max(statueTop, pedestalTop);
  const bottom = Math.min(statueBottom, pedestalBottom);
  const halfWidth = Math.max(statueWidth / 2, PEDESTAL.bottomRadius);

  return {
    width: halfWidth * 2,
    height: top - bottom,
    centerY: (top + bottom) / 2 + ASSEMBLY_OFFSET_Y + VERTICAL_BIAS,
  };
}

function computeFitDistance(box: FrameBox, aspect: number, fovDeg: number = CAMERA_FOV_DEG): number {
  const vFov = THREE.MathUtils.degToRad(fovDeg);
  const tanHalfVFov = Math.tan(vFov / 2);

  // Primary fit: statue takes up exactly TARGET_VERTICAL_COVERAGE (70%) of
  // the screen height. This drives framing on nearly all devices — we
  // deliberately don't fit tightly to width so the statue doesn't zoom out
  // too far on typical narrow-but-tall phone screens.
  const distanceForHeight = box.height / 2 / (tanHalfVFov * TARGET_VERTICAL_COVERAGE);

  // Safety fit: on unusually narrow viewports, height-only fitting can leave
  // the statue wider than the visible frame. tan(halfHFov) = tan(halfVFov) *
  // aspect, so this derives the distance needed to also keep the statue
  // within TARGET_HORIZONTAL_COVERAGE of the width.
  const distanceForWidth = box.width / 2 / (tanHalfVFov * aspect * TARGET_HORIZONTAL_COVERAGE);

  // The larger distance wins: normal aspect ratios are unaffected (height
  // already contains the width there), and only genuinely narrow screens get
  // pulled back further — exactly as far as needed, no more.
  return Math.max(distanceForHeight, distanceForWidth);
}

type ModelFit = {
  scale: number;
  position: [number, number, number];
  width: number;
};

function useModelFit(url: string, targetHeight: number): ModelFit {
  const { scene } = useGLTF(url);
  return useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = targetHeight / Math.max(size.y, 0.0001);
    return {
      scale,
      position: [-center.x * scale, -box.min.y * scale, -center.z * scale] as [
        number,
        number,
        number
      ],
      width: size.x * scale,
    };
  }, [scene, targetHeight]);
}

function StatueModel({ fit, precision }: { fit: ModelFit; precision: "mediump" | "highp" }) {
  const outer = useRef<THREE.Group>(null);
  const tiltGroup = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const hasEntered = useRef(false);

  const isTouchDevice = useIsTouchDevice();
  const { tilt, requestPermission } = useDeviceTilt(isTouchDevice);
  const isDesktopMouse = !isTouchDevice;
  const desktopDrag = useDesktopDragRotation(isDesktopMouse);

  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [displayQuote, setDisplayQuote] = useState<string>("");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (activeQuote) {
      setDisplayQuote(activeQuote);
      const timer = setTimeout(() => {
        setActiveQuote(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [activeQuote]);

  const legalQuotes = useMemo(() => [
    "Justice delayed is justice denied.",
    "The law is reason free from passion. – Aristotle",
    "Injustice anywhere is a threat to justice everywhere. – MLK Jr.",
    "No one is above the law and no one is below it.",
    "The safety of the people shall be the highest law.",
    "Law is order, and good law is good order.",
    "It is the spirit and not the form of law that keeps justice alive.",
    "A jury consists of twelve persons chosen to decide who has the better lawyer.",
    "If there were no bad people, there would be no good lawyers.",
    "He who comes to equity must come with clean hands.",
    "Justice is truth in action. – Benjamin Disraeli",
    "The execution of the laws is more important than the making of them.",
    "A law is valuable not because it is a law, but because there is right in it.",
    "To err is human, but to follow procedure is strictly legal.",
    "Ignorance of the law excuses no man.",
    "Every law is an infraction of liberty. – Jeremy Bentham",
    "Freedom under the law is the only freedom.",
    "Where law ends, tyranny begins. – John Locke",
    "Let justice be done though the heavens fall.",
    "A judge is a law student who marks his own examination papers.",
    "Compromise is the best and cheapest lawyer.",
    "The highest law is the conscience. – Victor Hugo",
    "Good men must not obey the laws too well.",
    "Lawmakers should not be lawbreakers.",
    "Justice is the crowning glory of the virtues.",
    "The law is not a machine, it is a living thing.",
    "A society that has more justice is a society that needs less charity.",
    "The power of the lawyer is in the uncertainty of the law.",
    "Justice cannot be for one side alone, but must be for both.",
    "It is better that ten guilty persons escape than that one innocent suffer.",
    "A true lawyer places truth and justice above all else.",
    "Laws control the lesser man... Right conduct controls the greater one.",
    "The courtroom is the crucible of justice.",
    "A contract is a mutual promise protected by law.",
    "The scales of justice balance the truth.",
    "Equity looks upon that as done which ought to be done.",
    "The strict dictates of law are often at odds with the pure essence of justice.",
    "A good lawyer knows the law; a great lawyer knows the judge.",
    "Reason is the soul of the law.",
    "De minimis non curat lex (The law does not concern itself with trifles).",
    "Actus non facit reum nisi mens sit rea (An act does not make a person guilty unless their mind is also guilty).",
    "Habeas Corpus: You shall have the body."
  ].sort(() => Math.random() - 0.5), []);

  const { scene } = useGLTF(MODEL_URL);
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        if (mesh.material) {
          (mesh.material as THREE.Material).side = THREE.FrontSide;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            mat.precision = precision;
          });
        }
      }
    });
    return clone;
  }, [scene, precision]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (outer.current) {
        gsap.fromTo(
          outer.current.position,
          { y: -3.5 },
          { y: 0, duration: 1.8, ease: "power3.out", delay: 0.5 }
        );
        gsap.fromTo(
          outer.current.rotation,
          { y: -Math.PI * 0.65 },
          {
            y: 0,
            duration: 2.0,
            ease: "power3.out",
            delay: 0.5,
            // Tilt-driven rotation lives on a separate nested group (see
            // tiltGroup below) and only starts once this is done, so the two
            // never fight over the same frame.
            onComplete: () => {
              hasEntered.current = true;
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!outer.current || !floatGroup.current) return;
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.006;
    floatGroup.current.scale.set(breathe, 1, breathe);
    floatGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;

    // Phones / iPads / tablets: gyro-driven movement.
    // Desktop / laptops: mouse-drag rotation.
    if (tiltGroup.current && hasEntered.current) {
      if (isTouchDevice) {
        const damp = 1 - Math.pow(TILT_SMOOTHING, delta);
        const targetYaw = tilt.current.x * MAX_TILT_YAW;
        const targetPitch = tilt.current.y * MAX_TILT_PITCH;

        tiltGroup.current.rotation.y += (targetYaw - tiltGroup.current.rotation.y) * damp;
        tiltGroup.current.rotation.x += (targetPitch - tiltGroup.current.rotation.x) * damp;
      } else {
        const desktopDamp = 1 - Math.pow(0.0008, delta);
        const targetYaw = desktopDrag.rotation.current.y;
        const targetPitch = desktopDrag.rotation.current.x;

        tiltGroup.current.rotation.y += (targetYaw - tiltGroup.current.rotation.y) * desktopDamp;
        tiltGroup.current.rotation.x += (targetPitch - tiltGroup.current.rotation.x) * desktopDamp;
      }
    }
  });

  const handleStatueClick = (e: any) => {
    e.stopPropagation();

    // iOS only grants motion/orientation access from inside a user gesture.
    requestPermission();

    // A desktop drag rotates the statue and should not also trigger a quote.
    if (isDesktopMouse && desktopDrag.consumeClick()) return;

    setActiveQuote(legalQuotes[clickCount % legalQuotes.length]);
    setClickCount((prev) => prev + 1);
  };

  return (
    <group ref={outer} position={[0, 0, 0]} dispose={null}>
      {/* Tilt-driven rotation lives on its own group, separate from the
          entrance-animation group above and untouched by any pointer event. */}
      <group ref={tiltGroup}>
        <group ref={floatGroup}>
          <group ref={inner} scale={fit.scale} position={fit.position}>
            <primitive object={clonedScene} raycast={() => {}} />
          </group>

          {/* Tightly wrapped proxy collider — tap-to-reveal-quote only, non-grabbable */}
          <mesh
            position={[0, TARGET_HEIGHT / 2, 0]}
            onClick={handleStatueClick}
            onPointerDown={(e) => {
              if (isDesktopMouse) desktopDrag.beginDrag(e);
              else requestPermission();
            }}
            onPointerMove={(e) => {
              if (isDesktopMouse) desktopDrag.drag(e);
            }}
            onPointerUp={(e) => {
              if (isDesktopMouse) desktopDrag.endDrag(e);
            }}
            onPointerCancel={(e) => {
              if (isDesktopMouse) desktopDrag.endDrag(e);
            }}
            onPointerEnter={(e) => {
              e.stopPropagation();
              document.body.style.cursor = isDesktopMouse ? 'grab' : 'pointer';
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              if (isDesktopMouse) desktopDrag.endDrag(e);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Widened slightly for better touch targets on mobile */}
            <cylinderGeometry args={[0.55, 0.65, TARGET_HEIGHT * 0.95, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          <Html position={[0, TARGET_HEIGHT + 0.35, 0]} center zIndexRange={[100, 0]}>
            <div
              style={{
                opacity: activeQuote ? 1 : 0,
                transform: activeQuote ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none'
              }}
              className="w-64 sm:w-80 bg-black/90 text-white/90 p-4 rounded-xl shadow-2xl border border-white/20 text-center"
            >
              <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                "{displayQuote}"
              </p>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

function CameraRig({ pointer, frameBox }: { pointer: PointerRef; frameBox: FrameBox }) {
  const { camera, size } = useThree();
  const settled = useRef(false);
  const lookTarget = useMemo(() => new THREE.Vector3(0, frameBox.centerY, 0), [frameBox.centerY]);

  const aspect = size.height > 0 ? clamp(size.width / size.height, 0.2, 5) : 0.5;
  const fittedZ = computeFitDistance(frameBox, aspect);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      camera.position.set(0, frameBox.centerY, fittedZ * ENTRANCE_ZOOM_FACTOR);
      if (camera instanceof THREE.PerspectiveCamera) {
        const targetFov = camera.fov;
        camera.fov = targetFov + 10;
        camera.updateProjectionMatrix();
        gsap.to(camera, {
          fov: targetFov,
          duration: 2.4,
          ease: "power3.out",
          onUpdate: () => camera.updateProjectionMatrix(),
        });
      }
      gsap.to(camera.position, {
        x: 0,
        y: frameBox.centerY,
        z: fittedZ,
        duration: 2.4,
        ease: "power3.out",
        onComplete: () => (settled.current = true),
      });
    });

    return () => ctx.revert();
  }, [camera, frameBox.centerY, fittedZ]);

  useFrame((state, delta) => {
    const idleFor = performance.now() - pointer.current.lastMove;
    const isIdle = idleFor > 1400;
    const damp = 1 - Math.pow(0.0015, delta);

    const parallaxX = isIdle ? 0 : pointer.current.x * 0.15;
    const parallaxY = isIdle ? 0 : pointer.current.y * -0.05;
    const drift = settled.current ? Math.sin(state.clock.elapsedTime * 0.12) * 0.06 : 0;

    const targetX = parallaxX + drift;
    const targetY = frameBox.centerY + parallaxY;

    camera.position.x += (targetX - camera.position.x) * damp;
    camera.position.y += (targetY - camera.position.y) * damp;
    if (settled.current) {
      camera.position.z += (fittedZ - camera.position.z) * damp;
    }
    camera.lookAt(lookTarget);
  });

  return null;
}

function LightingRig({ shadowMapSize, isDark, useShadows }: { shadowMapSize: number; isDark: boolean; useShadows: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.25 : 0.45} color={isDark ? "#3a3222" : "#eae4d8"} />
      <directionalLight
        position={[3.5, 5, 3]}
        intensity={isDark ? 1.7 : 1.8}
        color={isDark ? "#f4d998" : "#fff8ee"}
        castShadow={useShadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-far={12}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0004}
        shadow-radius={isDark ? 1 : 4}
      />
      <spotLight
        position={[-3, 2.5, -2]}
        angle={0.6}
        penumbra={0.8}
        intensity={isDark ? 1.4 : 1.1} 
        color="#0B1F3A"
      />
      <spotLight
        position={[2.5, 4, 1.8]}
        angle={0.4}
        penumbra={0.5}
        intensity={isDark ? 1.55 : 1.1}
        color="#C9A227"
      />
      <pointLight position={[0, 1.2, 2]} intensity={isDark ? 0.35 : 0.3} color="#fff3d6" />
    </>
  );
}

function FramedStatue({ pointer, useHDRI, frameBox, precision }: { pointer: PointerRef; useHDRI: boolean; frameBox: FrameBox; precision: "mediump" | "highp" }) {
  const fit = useModelFit(MODEL_URL, TARGET_HEIGHT);
  const isSurfacePro = useIsSurfacePro();

  // Framing is based on the actual rendered canvas width. Desktop is lowered
  // by one inch, while the Surface Pro receives a separate one-inch lift.
  const { size } = useThree();
  const verticalOffset = useMemo(() => {
    const t = smoothstep(size.width, MOBILE_WIDTH_BREAKPOINT, DESKTOP_WIDTH_BREAKPOINT);
    return THREE.MathUtils.lerp(MOBILE_Y_OFFSET, DESKTOP_Y_OFFSET, t);
  }, [size.width]);

  const surfaceProLift = isSurfacePro ? SURFACE_PRO_Y_LIFT : 0;

  return (
    <>
      <CameraRig pointer={pointer} frameBox={frameBox} />
      <group position={[0, ASSEMBLY_OFFSET_Y + verticalOffset + surfaceProLift, 0]}>
        <StatueModel fit={fit} precision={precision} />
      </group>
      {useHDRI && <Environment preset="city" />}
    </>
  );
}

function Scene({ renderTier, isDark }: { renderTier: RenderTier; isDark: boolean }) {
  const settings = RENDER_SETTINGS[renderTier];
  const pointer = usePointerState();
  const fit = useModelFit(MODEL_URL, TARGET_HEIGHT);
  const frameBox = useMemo(() => getCombinedFrameBox(fit.width), [fit.width]);

  const { gl } = useThree();
  const setDpr = useThree((state) => state.setDpr);

  useEffect(() => {
    gl.domElement.style.touchAction = "pan-y";
  }, [gl]);

  return (
    <>
      <PerformanceMonitor
        factor={1}
        onDecline={() => setDpr(settings.dpr[0])}
        onIncline={() => setDpr(settings.dpr[1])}
      />

      <LightingRig shadowMapSize={settings.shadowMapSize} isDark={isDark} useShadows={settings.useShadows} />

      <Suspense fallback={null}>
        <FramedStatue pointer={pointer} useHDRI={settings.useHDRI} frameBox={frameBox} precision={settings.precision} />
        <Preload all />
      </Suspense>

      {settings.usePostFX && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={isDark ? 0.75 : 0.88}
            luminanceSmoothing={0.25}
            intensity={isDark ? 0.38 : 0.25}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={isDark ? 0.75 : 0.3} />
        </EffectComposer>
      )}
    </>
  );
}

interface LadyJusticeStatue3DProps {
  className?: string;
}

const INITIAL_CAMERA_FALLBACK: [number, number, number] = [0, 0, 8];

const LadyJusticeStatue3D: React.FC<LadyJusticeStatue3DProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTier = useRenderTier(containerRef);
  const settings = RENDER_SETTINGS[renderTier];
  const isDark = true;

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        shadows={settings.useShadows ? "soft" : false}
        dpr={settings.dpr}
        camera={{ position: INITIAL_CAMERA_FALLBACK, fov: CAMERA_FOV_DEG }}
        gl={{
          alpha: true,
          antialias: settings.antialias,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.1 : 1.05,
        }}
        style={{
          pointerEvents: "auto",
          background: isDark
            ? "transparent"
            : "radial-gradient(circle at center, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0) 70%)",
          touchAction: "pan-y",
        }}
      >
        <Scene renderTier={renderTier} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default LadyJusticeStatue3D;