import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

interface ScalesOfJusticeProps {
  className?: string;
  respectReducedMotion?: boolean;
}

const BRASS = 0xb8863b; // warm antique brass
const BRASS_LIGHT = 0xe8c887; // polished highlight brass
const BRASS_DEEP = 0x7a5426; // recessed / shadowed brass
const BG_WARM = 0x241c14; // warm mahogany-charcoal, replaces navy/starry tone

const ScalesOfJustice: React.FC<ScalesOfJusticeProps> = ({
  className = "",
  respectReducedMotion = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion =
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // ---------- Scene / Camera / Renderer ----------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG_WARM, 0.026);

    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight || 1, 0.1, 100);

    const updateCamera = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      const aspect = w / h;
      if (aspect < 0.6) {
        // Very narrow phones in portrait
        camera.fov = 44;
        camera.position.set(0, 0.35, 14.5);
      } else if (aspect < 1) {
        camera.fov = 40;
        camera.position.set(0, 0.4, 12.5);
      } else {
        camera.fov = 38;
        camera.position.set(0, 0.4, 10.5);
      }
      camera.lookAt(0, 0.1, 0);
    };
    updateCamera();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.touchAction = "none";
    mount.appendChild(renderer.domElement);

    // ---------- Environment & Post-Processing ----------
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      0.45,
      0.75,
      0.9
    );
    composer.addPass(bloomPass);

    // ---------- Warm Lighting (no cool/blue tint) ----------
    scene.add(new THREE.AmbientLight(0xffe9c6, 0.55));

    const keyLight = new THREE.PointLight(0xfff1d6, 6.2, 40, 1.6);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffcf8a, 3.2, 40, 2);
    rimLight.position.set(-8, -2, -6);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xd99a3f, 2.0, 25, 2);
    fillLight.position.set(-5, 5, 6);
    scene.add(fillLight);

    // ---------- Premium Brass Materials ----------
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: BRASS,
      metalness: 1,
      roughness: 0.28,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.4,
    });

    const brassMatPolished = new THREE.MeshPhysicalMaterial({
      color: BRASS_LIGHT,
      metalness: 1,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.9,
    });

    const brassMatDeep = new THREE.MeshPhysicalMaterial({
      color: BRASS_DEEP,
      metalness: 0.95,
      roughness: 0.4,
      clearcoat: 0.4,
      envMapIntensity: 1.1,
    });

    const chainMat = new THREE.MeshPhysicalMaterial({
      color: BRASS_LIGHT,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.7,
      envMapIntensity: 1.6,
    });

    // ---------- Rig root ----------
    const rig = new THREE.Group();

    // 1. Round weighted base (flared foot, beaded ring, like classic freestanding scales)
    const basePoints = [
      new THREE.Vector2(0.0, -2.55),
      new THREE.Vector2(1.15, -2.55),
      new THREE.Vector2(1.2, -2.48),
      new THREE.Vector2(1.05, -2.4),
      new THREE.Vector2(0.95, -2.3),
      new THREE.Vector2(0.85, -2.24),
      new THREE.Vector2(0.5, -2.2),
      new THREE.Vector2(0.35, -2.1),
    ];
    const baseGeo = new THREE.LatheGeometry(basePoints, 72);
    const base = new THREE.Mesh(baseGeo, brassMat);
    rig.add(base);

    const beadRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 14, 72), brassMatPolished);
    beadRing.rotation.x = Math.PI / 2;
    beadRing.position.y = -2.28;
    rig.add(beadRing);

    // 2. Tapered fluted column with a mid-band and capital
    const pillarPoints = [
      new THREE.Vector2(0.32, -2.1),
      new THREE.Vector2(0.24, -1.95),
      new THREE.Vector2(0.28, -1.7),
      new THREE.Vector2(0.2, -0.6),
      new THREE.Vector2(0.24, -0.55),
      new THREE.Vector2(0.2, 0.5),
      new THREE.Vector2(0.16, 1.35),
      new THREE.Vector2(0.24, 1.55),
      new THREE.Vector2(0.3, 1.68),
      new THREE.Vector2(0.14, 1.78),
      new THREE.Vector2(0.0, 1.8),
    ];
    const pillarGeo = new THREE.LatheGeometry(pillarPoints, 40);
    const pillar = new THREE.Mesh(pillarGeo, brassMat);
    rig.add(pillar);

    const midBand = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.035, 12, 40), brassMatPolished);
    midBand.rotation.x = Math.PI / 2;
    midBand.position.y = -0.58;
    rig.add(midBand);

    const centerNode = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), brassMatPolished);
    centerNode.position.y = 0.15;
    rig.add(centerNode);

    // 3. Ornate crest / finial crown above the pivot
    const crownGroup = new THREE.Group();
    crownGroup.position.y = 1.8;

    const crownBasePoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.16, 0.06),
      new THREE.Vector2(0.2, 0.16),
      new THREE.Vector2(0.12, 0.26),
      new THREE.Vector2(0.0, 0.3),
    ];
    const crownBaseGeo = new THREE.LatheGeometry(crownBasePoints, 32);
    crownGroup.add(new THREE.Mesh(crownBaseGeo, brassMatPolished));

    // Fanned leaf-like ornaments around the crown (stylised acanthus fan)
    const leafCount = 7;
    for (let i = 0; i < leafCount; i++) {
      const t = i / (leafCount - 1);
      const angle = (t - 0.5) * Math.PI * 0.85;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.34, 10), brassMat);
      leaf.position.set(Math.sin(angle) * 0.16, 0.22, Math.cos(angle) * 0.05);
      leaf.rotation.z = -angle * 0.9;
      leaf.rotation.x = 0.5;
      leaf.scale.set(1, 1 - Math.abs(t - 0.5) * 0.5, 1);
      crownGroup.add(leaf);
    }

    const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), brassMatPolished);
    finialBall.position.y = 0.42;
    crownGroup.add(finialBall);

    rig.add(crownGroup);

    // 4. Gently arched beam (matches the classic curved-arm silhouette)
    const beamGroup = new THREE.Group();
    beamGroup.position.y = 1.72;

    const beamCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.55, -0.12, 0),
      new THREE.Vector3(-1.4, 0.16, 0),
      new THREE.Vector3(0, 0.24, 0),
      new THREE.Vector3(1.4, 0.16, 0),
      new THREE.Vector3(2.55, -0.12, 0),
    ]);
    const beamGeo = new THREE.TubeGeometry(beamCurve, 48, 0.062, 16, false);
    beamGroup.add(new THREE.Mesh(beamGeo, brassMat));

    const beamHub = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), brassMatPolished);
    beamGroup.add(beamHub);

    const ARM_X = 2.55;
    const ARM_Y = -0.12;

    [-1, 1].forEach((side) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20), brassMatPolished);
      cap.position.set(side * ARM_X, ARM_Y, 0);
      beamGroup.add(cap);

      // Small decorative scroll hook where the chains gather
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.022, 10, 24), brassMatDeep);
      hook.position.set(side * ARM_X, ARM_Y - 0.1, 0);
      hook.rotation.x = Math.PI / 2;
      beamGroup.add(hook);
    });

    rig.add(beamGroup);

    // ---------- Chain builder (segmented links, not a smooth tube) ----------
    const buildChain = (start: THREE.Vector3, end: THREE.Vector3, linkCount: number) => {
      const group = new THREE.Group();
      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();
      dir.normalize();
      const linkLen = length / linkCount;
      const linkGeo = new THREE.TorusGeometry(linkLen * 0.36, linkLen * 0.1, 8, 12);
      const baseQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      for (let i = 0; i < linkCount; i++) {
        const t = (i + 0.5) / linkCount;
        const pos = new THREE.Vector3().copy(start).addScaledVector(dir, length * t);
        const link = new THREE.Mesh(linkGeo, chainMat);
        link.position.copy(pos);
        const roll = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), (i % 2) * (Math.PI / 2));
        link.quaternion.copy(baseQuat).multiply(roll);
        group.add(link);
      }
      return group;
    };

    // 5. Pans + their 3-point chains, each hung from a pivot that stays level
    const PAN_DROP = 1.55;

    const buildPanAssembly = (side: 1 | -1) => {
      const pivot = new THREE.Group();
      pivot.position.set(side * ARM_X, ARM_Y, 0);

      const bowlPoints = [
        new THREE.Vector2(0.0, 0.0),
        new THREE.Vector2(0.22, 0.015),
        new THREE.Vector2(0.45, 0.06),
        new THREE.Vector2(0.68, 0.16),
        new THREE.Vector2(0.8, 0.24),
        new THREE.Vector2(0.76, 0.21),
        new THREE.Vector2(0.0, 0.09),
      ];
      const bowlGeo = new THREE.LatheGeometry(bowlPoints, 48);
      const bowl = new THREE.Mesh(bowlGeo, brassMat);
      bowl.position.y = -PAN_DROP;
      bowl.rotation.x = Math.PI;
      pivot.add(bowl);

      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.032, 14, 48), brassMatPolished);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = -PAN_DROP + 0.24;
      pivot.add(rim);

      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 + (side === 1 ? Math.PI / 2 : 0);
        const eyelet = new THREE.Vector3(Math.cos(angle) * 0.78, -PAN_DROP + 0.22, Math.sin(angle) * 0.78);
        const hookStart = new THREE.Vector3(0, -0.08, 0);
        pivot.add(buildChain(hookStart, eyelet, 7));

        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 16), brassMatDeep);
        ring.position.copy(eyelet);
        ring.rotation.x = Math.PI / 2;
        pivot.add(ring);
      }

      // Larger invisible hit-area for comfortable tapping on mobile
      const hitZone = new THREE.Mesh(
        new THREE.SphereGeometry(1.05, 12, 12),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
      );
      hitZone.position.y = -PAN_DROP * 0.55;
      hitZone.userData.side = side;
      pivot.add(hitZone);

      beamGroup.add(pivot);
      return pivot;
    };

    const leftPivot = buildPanAssembly(-1);
    const rightPivot = buildPanAssembly(1);

    scene.add(rig);

    // ---------- Soft ambient dust (sparse, warm — not a starfield) ----------
    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe9cf80,
      size: 0.09,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    rig.scale.setScalar(0.001);

    // ---------- Parallax (idle tilt toward pointer) ----------
    let targetRotY = 0;
    let targetRotX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = mouseX * 0.35;
      targetRotX = mouseY * 0.12;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // ---------- Click-to-weigh interaction ----------
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const hitTargets = [leftPivot, rightPivot];

    let tiltPos = 0; // current spring position (radians)
    let tiltVel = 0;
    let tiltTarget = 0;
    let returnTimeout: ReturnType<typeof setTimeout> | null = null;
    const MAX_TILT = 0.32;
    const HOLD_MS = 850;

    const getPointerFromEvent = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerDown = (e: PointerEvent) => {
      getPointerFromEvent(e);
      raycaster.setFromCamera(pointerNdc, camera);
      const intersects = raycaster.intersectObjects(hitTargets, true);
      if (intersects.length === 0) return;

      let side: number | undefined;
      for (const hit of intersects) {
        if (typeof hit.object.userData.side === "number") {
          side = hit.object.userData.side;
          break;
        }
      }
      if (side === undefined) return;

      if (returnTimeout) clearTimeout(returnTimeout);
      // Clicked side sinks down: beam rotates so that side's arm drops.
      tiltTarget = side === 1 ? MAX_TILT : -MAX_TILT;
      returnTimeout = setTimeout(() => {
        tiltTarget = 0;
      }, HOLD_MS);
    };

    const handleHoverCursor = (e: PointerEvent) => {
      getPointerFromEvent(e);
      raycaster.setFromCamera(pointerNdc, camera);
      const intersects = raycaster.intersectObjects(hitTargets, true);
      renderer.domElement.style.cursor = intersects.length > 0 ? "pointer" : "default";
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handleHoverCursor);

    // ---------- Resize ----------
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      updateCamera();
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ---------- Animation loop ----------
    let frameId = 0;
    let entrance = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);

      if (entrance < 1) {
        entrance = Math.min(1, entrance + 0.012);
        const eased = 1 - Math.pow(1 - entrance, 3);
        rig.scale.setScalar(0.001 + eased * 0.999);
      }

      // Damped spring toward the current tilt target (the "weigh down" motion)
      const stiffness = 55;
      const damping = 9;
      const accel = (tiltTarget - tiltPos) * stiffness - tiltVel * damping;
      tiltVel += accel * dt;
      tiltPos += tiltVel * dt;
      beamGroup.rotation.z = tiltPos + (prefersReducedMotion ? 0 : Math.sin(t * 0.3) * 0.02);

      // Counter-rotate each pan pivot so the pans stay level while the beam tips
      leftPivot.rotation.z = -beamGroup.rotation.z;
      rightPivot.rotation.z = -beamGroup.rotation.z;

      if (!prefersReducedMotion) {
        rig.rotation.y += (targetRotY - rig.rotation.y) * 0.04;
        rig.rotation.x += (targetRotX - rig.rotation.x) * 0.04;
        rig.position.y = Math.sin(t * 0.4) * 0.12;
        particles.rotation.y = t * 0.01;
      }

      composer.render();
    };
    animate();

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(frameId);
      if (returnTimeout) clearTimeout(returnTimeout);
      window.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handleHoverCursor);
      resizeObserver.disconnect();
      pmremGenerator.dispose();
      renderer.dispose();
      composer.dispose();
      brassMat.dispose();
      brassMatPolished.dispose();
      brassMatDeep.dispose();
      chainMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material as THREE.Material;
          if (
            mat &&
            mat !== brassMat &&
            mat !== brassMatPolished &&
            mat !== brassMatDeep &&
            mat !== chainMat &&
            mat !== particleMat
          ) {
            mat.dispose();
          }
        }
      });
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [respectReducedMotion]);

  return <div ref={mountRef} className={`select-none ${className}`} aria-hidden="true" />;
};

export default ScalesOfJustice;
