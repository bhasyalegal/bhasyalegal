import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

type DeviceTier = "desktop" | "tablet" | "mobile";

function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("desktop");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setTier("mobile");
      else if (w < 1024) setTier("tablet");
      else setTier("desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return tier;
}

const TIER_SETTINGS: Record<
  DeviceTier,
  {
    shadowMapSize: number;
    useHDRI: boolean;
    usePostFX: boolean;
    dpr: [number, number];
    statueScale: number;
    statuePosition: [number, number, number];
    cameraPosition: [number, number, number];
    fov: number;
  }
> = {
  desktop: {
    shadowMapSize: 2048,
    useHDRI: true,
    usePostFX: true,
    dpr: [1, 2],
    statueScale: 1,
    statuePosition: [0, -1.6, 0],
    cameraPosition: [0, 0.4, 5.2],
    fov: 30,
  },
  tablet: {
    shadowMapSize: 1024,
    useHDRI: true,
    usePostFX: false,
    dpr: [1, 1.5],
    statueScale: 1.3,
    statuePosition: [0, -1.6, 0],
    cameraPosition: [0, 0.3, 5.5],
    fov: 32,
  },
  mobile: {
    shadowMapSize: 512,
    useHDRI: false,
    usePostFX: false,
    dpr: [1, 1.5],
    statueScale: 1,
    statuePosition: [0, -1.5, 0],
    cameraPosition: [0, 0.2, 6.0],
    fov: 38,
  },
};

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

function StatueModel({ pointer, scale }: { pointer: PointerRef; scale: number }) {
  const outer = useRef<THREE.Group>(null);       // GSAP Entrance & Mouse Tilt/Yaw
  const floatGroup = useRef<THREE.Group>(null);  // Per-frame float & breath
  const inner = useRef<THREE.Group>(null);       // Model centering & scale fit

  const { scene } = useGLTF(MODEL_URL);
  
  // Clone scene so R3F re-renders/remounts don't corrupt GLTF geometry transform
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!inner.current) return;

    // Calculate scale from fresh geometry
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const fitScale = TARGET_HEIGHT / Math.max(size.y, 0.0001);
    inner.current.scale.setScalar(fitScale);
    inner.current.position.set(-center.x * fitScale, -box.min.y * fitScale, -center.z * fitScale);

    // GSAP entrance context with automatic cleanup on unmount/resize
    const ctx = gsap.context(() => {
      if (outer.current) {
        gsap.fromTo(
          outer.current.position,
          { y: -3.5 },
          { y: 0, duration: 1.8, ease: "power3.out", delay: 0.15 }
        );
        gsap.fromTo(
          outer.current.rotation,
          { y: -Math.PI * 0.65 },
          { y: 0, duration: 2.0, ease: "power3.out", delay: 0.15 }
        );
      }
    });

    return () => ctx.revert();
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!outer.current || !floatGroup.current) return;

    const idleFor = performance.now() - pointer.current.lastMove;
    const isIdle = idleFor > 1400;

    const targetYaw = isIdle ? 0 : THREE.MathUtils.degToRad(pointer.current.x * 5);
    const targetTilt = isIdle ? 0 : THREE.MathUtils.degToRad(pointer.current.y * -2);

    const damp = 1 - Math.pow(0.001, delta);
    outer.current.rotation.y += (targetYaw - outer.current.rotation.y) * damp;
    outer.current.rotation.x += (targetTilt - outer.current.rotation.x) * damp;

    // Apply floating to floatGroup so it never overwrites outer's GSAP position
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.006;
    floatGroup.current.scale.set(breathe * scale, scale, breathe * scale);
    floatGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
  });

  return (
    <group ref={outer} position={[0, 0, 0]} dispose={null}>
      <group ref={floatGroup}>
        <group ref={inner}>
          <primitive object={clonedScene} />
        </group>
        <mesh position={[0, -0.16, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[0.95, 1.08, 0.32, 8]} />
          <meshStandardMaterial color="#1c2027" metalness={0.2} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function CameraRig({
  pointer,
  basePosition,
}: {
  pointer: PointerRef;
  basePosition: [number, number, number];
}) {
  const { camera } = useThree();
  const settled = useRef(false);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0.2, 0), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      camera.position.set(basePosition[0], basePosition[1], basePosition[2] + 2.6);
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
        x: basePosition[0],
        y: basePosition[1],
        z: basePosition[2],
        duration: 2.4,
        ease: "power3.out",
        onComplete: () => (settled.current = true),
      });
    });

    return () => ctx.revert();
  }, [camera, basePosition]);

  useFrame((state, delta) => {
    const idleFor = performance.now() - pointer.current.lastMove;
    const isIdle = idleFor > 1400;
    const damp = 1 - Math.pow(0.0015, delta);

    const parallaxX = isIdle ? 0 : pointer.current.x * 0.15;
    const parallaxY = isIdle ? 0 : pointer.current.y * -0.05;

    const drift = settled.current ? Math.sin(state.clock.elapsedTime * 0.12) * 0.06 : 0;

    const targetX = basePosition[0] + parallaxX + drift;
    const targetY = basePosition[1] + parallaxY;

    camera.position.x += (targetX - camera.position.x) * damp;
    camera.position.y += (targetY - camera.position.y) * damp;
    camera.lookAt(lookTarget);
  });

  return null;
}

function LightingRig({ shadowMapSize }: { shadowMapSize: number }) {
  return (
    <>
      <ambientLight intensity={0.22} color="#3a3222" />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.7}
        color="#f4d998"
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-far={12}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0004}
      />
      <spotLight position={[-2.2, 2.6, -3]} angle={0.5} penumbra={0.7} intensity={1.1} color="#5b7fd6" />
      <spotLight position={[2.4, 4, 1.6]} angle={0.35} penumbra={0.5} intensity={1.3} color="#C59B27" castShadow />
      <pointLight position={[0, 1.4, 1.8]} intensity={0.35} color="#fff3d6" />
    </>
  );
}

function Scene({ tier }: { tier: DeviceTier }) {
  const settings = TIER_SETTINGS[tier];
  const pointer = usePointerState();

  return (
    <>
      <LightingRig shadowMapSize={settings.shadowMapSize} />
      <CameraRig pointer={pointer} basePosition={settings.cameraPosition} />

      <Suspense fallback={null}>
        <group position={settings.statuePosition}>
          <StatueModel pointer={pointer} scale={settings.statueScale} />
        </group>
        {settings.useHDRI && <Environment preset="city" />}
      </Suspense>

      <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={8} blur={2.2} far={2.5} />

      {settings.usePostFX && (
        <EffectComposer>
          <DepthOfField focusDistance={0.015} focalLength={0.04} bokehScale={3} height={480} />
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.3} intensity={0.55} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

interface LadyJusticeStatue3DProps {
  className?: string;
}

const LadyJusticeStatue3D: React.FC<LadyJusticeStatue3DProps> = ({ className = "" }) => {
  const tier = useDeviceTier();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 400 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  const settings = TIER_SETTINGS[tier];

  return (
    <div className={className}>
      {ready && (
        <Canvas
          shadows="soft"
          dpr={settings.dpr}
          camera={{ position: settings.cameraPosition, fov: settings.fov }}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          style={{ background: "transparent" }}
        >
          <Scene tier={tier} />
        </Canvas>
      )}
    </div>
  );
};

export default LadyJusticeStatue3D;