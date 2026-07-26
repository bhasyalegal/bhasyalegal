import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls, Html, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { useTheme } from "next-themes";


type RenderTier = "efficient" | "balanced" | "premium";

type RenderSettings = {
  shadowMapSize: number;
  useHDRI: boolean;
  usePostFX: boolean;
  dpr: [number, number];
};

const RENDER_SETTINGS: Record<RenderTier, RenderSettings> = {
  efficient: {
    shadowMapSize: 512,
    useHDRI: false,
    usePostFX: false,
    dpr: [1, 1.5],
  },
  balanced: {
    shadowMapSize: 1024,
    useHDRI: true,
    usePostFX: false,
    dpr: [1, 1.5],
  },
  premium: {
    shadowMapSize: 2048,
    useHDRI: true,
    usePostFX: true,
    dpr: [1, 2],
  },
};

function useRenderTier(): RenderTier {
  const [tier, setTier] = useState<RenderTier>("premium");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setTier("efficient");
      else if (w < 1280) setTier("balanced");
      else setTier("premium");
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);
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
const FRAME_PADDING = 1.15;
const VERTICAL_BIAS = 0;
const ENTRANCE_ZOOM_FACTOR = 1.4;

type FrameBox = { width: number; height: number; centerY: number };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

  const distanceForHeight = box.height / 2 / Math.tan(vFov / 2);
  const distanceForWidth = box.width / 2 / Math.tan(hFov / 2);

  return Math.max(distanceForHeight, distanceForWidth) * FRAME_PADDING;
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

function StatueModel({ fit }: { fit: ModelFit }) {
  const outer = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

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
            mat.precision = "highp";
          });
        }
      }
    });
    return clone;
  }, [scene]);

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
          { y: 0, duration: 2.0, ease: "power3.out", delay: 0.5 }
        );
      }
    });
    return () => ctx.revert();
  }, [clonedScene]);

  useFrame((state) => {
    if (!outer.current || !floatGroup.current) return;
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.006;
    floatGroup.current.scale.set(breathe, 1, breathe);
    floatGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
  });

  const handleStatueClick = (e: any) => {
    e.stopPropagation();
    setActiveQuote(legalQuotes[clickCount % legalQuotes.length]);
    setClickCount((prev) => prev + 1);
  };

  return (
    <group ref={outer} position={[0, 0, 0]} dispose={null}>
      <group ref={floatGroup}>
        <group ref={inner} scale={fit.scale} position={fit.position}>
          <primitive object={clonedScene} raycast={() => null} />
        </group>

        {/* Tightly wrapped proxy collider for smooth clicking and dragging */}
        <mesh
          position={[0, TARGET_HEIGHT / 2, 0]}
          onClick={handleStatueClick}
          onPointerEnter={() => (document.body.style.cursor = 'grab')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
          onPointerDown={() => (document.body.style.cursor = 'grabbing')}
          onPointerUp={() => (document.body.style.cursor = 'grab')}
        >
          <cylinderGeometry args={[0.25, 0.38, TARGET_HEIGHT * 0.98, 12]} />
          <meshBasicMaterial visible={false} />
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
  }, [camera]);

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

function LightingRig({ shadowMapSize, isDark }: { shadowMapSize: number; isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.25 : 0.45} color={isDark ? "#3a3222" : "#eae4d8"} />
      <directionalLight
        position={[3.5, 5, 3]}
        intensity={isDark ? 1.7 : 1.8}
        color={isDark ? "#f4d998" : "#fff8ee"}
        castShadow
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
        color="#1B0738"
      />
      <spotLight
        position={[2.5, 4, 1.8]}
        angle={0.4}
        penumbra={0.5}
        intensity={isDark ? 1.3 : 1.1}
        color="#C59B27"
      />
      <pointLight position={[0, 1.2, 2]} intensity={isDark ? 0.35 : 0.3} color="#fff3d6" />
    </>
  );
}

function FramedStatue({ pointer, useHDRI, frameBox }: { pointer: PointerRef; useHDRI: boolean; frameBox: FrameBox }) {
  const fit = useModelFit(MODEL_URL, TARGET_HEIGHT);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const desktopYOffset = isDesktop ? -0.6 : 0;

  return (
    <>
      <CameraRig pointer={pointer} frameBox={frameBox} />
      <group position={[0, ASSEMBLY_OFFSET_Y + desktopYOffset, 0]}>
        <StatueModel fit={fit} />
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
  const targetLookAt = useMemo(() => new THREE.Vector3(0, frameBox.centerY, 0), [frameBox.centerY]);

  const { gl } = useThree();
  const controlsRef = useRef<any>(null);

  // Re-apply touchAction="pan-y" after OrbitControls mounts and sets touchAction="none"
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.domElement.style.touchAction = "pan-y";
    }
    gl.domElement.style.touchAction = "pan-y";
  }, [gl]);

  return (
    <>
      <LightingRig shadowMapSize={settings.shadowMapSize} isDark={isDark} />

      <Suspense fallback={null}>
        <FramedStatue pointer={pointer} useHDRI={settings.useHDRI} frameBox={frameBox} />
        <Preload all />
      </Suspense>

      {/* OrbitControls enables seamless mobile touch rotation & desktop dragging without blocking page scrolling */}
      <OrbitControls
  ref={(controls) => {
    if (controls && controls.domElement) {
      // Overwrite Three.js's default 'none' after it attaches to the DOM
      controls.domElement.style.touchAction = "pan-y";
    }
  }}
  enableZoom={false}
  enablePan={false}
  minPolarAngle={Math.PI / 2 - 0.10}
  maxPolarAngle={Math.PI / 2 + 0.10}
/>

      {settings.usePostFX && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={isDark ? 0.75 : 0.88}
            luminanceSmoothing={0.25}
            intensity={isDark ? 0.45 : 0.25}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={isDark ? 0.7 : 0.3} />
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
  const renderTier = useRenderTier();
  const settings = RENDER_SETTINGS[renderTier];
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={className}>
      <Canvas
        shadows="soft"
        dpr={settings.dpr}
        camera={{ position: INITIAL_CAMERA_FALLBACK, fov: CAMERA_FOV_DEG }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.1 : 1.05,
        }}
        style={{
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