"use client";

import { useEffect, useRef, useState } from "react";

type Akt3DLogoProps = {
  className?: string;
  modelPath?: string;
  /** Target size (in scene units) the model is scaled to fill. Larger = bigger wordmark. */
  fitSize?: number;
};

export function Akt3DLogo({
  className,
  modelPath = "/3d/akt3d.glb",
  fitSize = 2.55,
}: Akt3DLogoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // True when the browser can't give us a WebGL context — show a 2D fallback.
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setFailed(false);
    let mounted = true;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );

      if (!mounted || !containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch (err) {
        // No WebGL context available (e.g. too many live contexts) — show the
        // 2D fallback instead of throwing an unhandled error that crashes the
        // whole page.
        console.warn("Akt3DLogo: could not create a WebGL context.", err);
        if (mounted) setFailed(true);
        return;
      }
      const logoGroup = new THREE.Group();
      const loader = new GLTFLoader();
    const maxYaw = Math.PI / 9;
    const maxPitch = Math.PI / 12;
    const clampRotation = () => {
      logoGroup.rotation.y = THREE.MathUtils.clamp(
        logoGroup.rotation.y,
        -maxYaw,
        maxYaw,
      );
      logoGroup.rotation.x = THREE.MathUtils.clamp(
        logoGroup.rotation.x,
        -maxPitch,
        maxPitch,
      );
    };
    const randomSpeed = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const pointer = {
      active: false,
      previousX: 0,
      previousY: 0,
      velocityX: 0.0011,
      velocityY: 0.00028,
      randomDrift: 0.00018,
    };
      let frame = 0;
      let disposed = false;

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Make the canvas exactly fill (and stay centered in) the container at any
      // device pixel ratio, so the wordmark renders dead-center.
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      containerRef.current.appendChild(renderer.domElement);
      scene.add(logoGroup);

    camera.position.set(0, 0, 6.5);

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));

    const frontGlow = new THREE.PointLight(0x0abfa3, 8.5, 12);
    frontGlow.position.set(0, 0.4, 4);
    scene.add(frontGlow);

    const sideGlow = new THREE.PointLight(0x1d6feb, 4.5, 14);
    sideGlow.position.set(-3, 1.6, 2);
    scene.add(sideGlow);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.6);
    rimLight.position.set(2.8, 3.5, 4);
    scene.add(rimLight);

    const glowShellMaterial = new THREE.MeshBasicMaterial({
      color: 0x0abfa3,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

      const fitModel = (object: import("three").Object3D) => {
      object.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.computeBoundingBox();
        child.geometry.computeBoundingSphere();
      });

      // 1. Scale to the target size based on the model's natural bounds.
      const sizeBox = new THREE.Box3().setFromObject(object);
      const size = sizeBox.getSize(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z);
      object.scale.setScalar(
        Number.isFinite(maxAxis) && maxAxis > 0 ? fitSize / maxAxis : 0.6,
      );

      // 2. Recenter using the *scaled* bounds so the model sits dead-center
      //    in the canvas (otherwise an off-origin GLB drifts off-screen).
      object.updateMatrixWorld(true);
      const centerBox = new THREE.Box3().setFromObject(object);
      const center = centerBox.getCenter(new THREE.Vector3());
      object.position.sub(center);
    };

    loader.load(modelPath, (gltf) => {
      if (disposed) return;

      const model = gltf.scene;
      const glowShells: import("three").Mesh[] = [];
      fitModel(model);

      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;

        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x0abfa3),
          emissive: new THREE.Color(0x0abfa3),
          emissiveIntensity: 1.15,
          metalness: 0.05,
          roughness: 0.24,
        });

        const shell = child.clone();
        shell.material = glowShellMaterial;
        shell.scale.multiplyScalar(1.09);
        glowShells.push(shell);
      });

      glowShells.forEach((shell) => model.add(shell));
      logoGroup.add(model);
      logoGroup.rotation.x = -0.04;
      logoGroup.rotation.y = -0.08;
    });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointer.active = true;
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!pointer.active) return;

      const deltaX = event.clientX - pointer.previousX;
      const deltaY = event.clientY - pointer.previousY;

      pointer.velocityX = deltaX * 0.004;
      pointer.velocityY = deltaY * 0.003;
      logoGroup.rotation.y += deltaX * 0.007;
      logoGroup.rotation.x += deltaY * 0.005;
      clampRotation();

      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      pointer.active = false;

      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };

    const animate = () => {
      const driftX = Math.sin(performance.now() * 0.00017) * pointer.randomDrift;
      const driftY = Math.cos(performance.now() * 0.00013) * pointer.randomDrift;

      if (!pointer.active) {
        logoGroup.rotation.y += pointer.velocityX + driftX;
        logoGroup.rotation.x += pointer.velocityY + driftY;

        if (logoGroup.rotation.y >= maxYaw) {
          logoGroup.rotation.y = maxYaw;
          pointer.velocityX = -randomSpeed(0.00065, 0.00135);
        } else if (logoGroup.rotation.y <= -maxYaw) {
          logoGroup.rotation.y = -maxYaw;
          pointer.velocityX = randomSpeed(0.00065, 0.00135);
        }

        if (logoGroup.rotation.x >= maxPitch) {
          logoGroup.rotation.x = maxPitch;
          pointer.velocityY = -randomSpeed(0.00012, 0.00032);
        } else if (logoGroup.rotation.x <= -maxPitch) {
          logoGroup.rotation.x = -maxPitch;
          pointer.velocityY = randomSpeed(0.00012, 0.00032);
        }
      }

      logoGroup.rotation.z = Math.sin(performance.now() * 0.00011) * 0.035;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointercancel", handlePointerUp);
      animate();

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
        renderer.domElement.removeEventListener("pointermove", handlePointerMove);
        renderer.domElement.removeEventListener("pointerup", handlePointerUp);
        renderer.domElement.removeEventListener("pointercancel", handlePointerUp);

        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();

          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        });

        glowShellMaterial.dispose();
        // Free the WebGL context immediately so it doesn't leak across navigations.
        renderer.forceContextLoss();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [modelPath, fitSize]);

  return (
    <div ref={containerRef} className={className} aria-label="Interactive 3D AKT logo">
      {failed && (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="select-none font-syne font-extrabold tracking-tight text-[#0abfa3]"
            style={{
              fontSize: "clamp(48px, 14vw, 170px)",
              lineHeight: 1,
              textShadow:
                "0 0 30px rgba(10,191,163,0.6), 0 0 70px rgba(10,191,163,0.35)",
            }}
          >
            AKT
          </span>
        </div>
      )}
    </div>
  );
}
