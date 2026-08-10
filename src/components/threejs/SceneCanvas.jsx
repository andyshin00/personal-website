import { Suspense, useEffect, useRef, useState, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// Change this if the eye squints the wrong direction.
// Try "y" first. If it shrinks sideways, use "z" or "x".
const SQUINT_AXIS = "y";

// These stay on their flat/unlit RGB material — everything else gets
// swapped to MeshLambertMaterial below so it can receive real-time
// shadows without the moving Fresnel highlight a PBR material would add.
const FLAT_SHADED_NAMES = new Set([
  "character",
  "eye_l",
  "eye_r",
  "brow_l",
  "brow_r",
]);

function Model({ url, hoveredRef }) {
  const group = useRef();

  const { scene, animations } = useGLTF(url);
  const { actions, names, mixer } = useAnimations(animations, group);

  const [ready, setReady] = useState(false);
  const actionRef = useRef(null);

  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const leftEyeBaseScale = useRef(new THREE.Vector3(1, 1, 1));
  const rightEyeBaseScale = useRef(new THREE.Vector3(1, 1, 1));

  useEffect(() => {
    // Some of these (like "character") have multiple material slots, which
    // glTF splits into several child meshes under one named group — walk
    // each named object's own subtree so every sub-mesh is caught, not just
    // one with the exact matching name.
    const flatShadedMeshes = new Set();
    for (const name of FLAT_SHADED_NAMES) {
      const named = scene.getObjectByName(name);
      named?.traverse((node) => {
        if (node.isMesh) flatShadedMeshes.add(node);
      });
    }

    scene.traverse((child) => {
      if (!child.isMesh) return;

      // Casting is independent of the mesh's own material — even a flat
      // unlit mesh can still block light and throw a shadow onto others.
      child.castShadow = true;

      if (flatShadedMeshes.has(child)) return;

      // Only meshes we're converting to a lit material should *receive*
      // shadows — otherwise the renderer darkens the flat RGB meshes too.
      child.receiveShadow = true;

      const oldMaterial = child.material;
      child.material = new THREE.MeshLambertMaterial({
        color: oldMaterial.color,
        map: oldMaterial.map,
      });
      oldMaterial.dispose();
    });

    // Find eyes by Blender object names.
    // Your Outliner shows "eye_l" and "eye_r".
    leftEyeRef.current = scene.getObjectByName("eye_l");
    rightEyeRef.current = scene.getObjectByName("eye_r");

    if (leftEyeRef.current) {
      leftEyeBaseScale.current.copy(leftEyeRef.current.scale);
    }

    if (rightEyeRef.current) {
      rightEyeBaseScale.current.copy(rightEyeRef.current.scale);
    }

    // useGLTF caches this scene, so the same eye meshes come back on the
    // next mount — restore their scale so a future mount doesn't capture
    // an already-squinted value as its "base".
    return () => {
      if (leftEyeRef.current) {
        leftEyeRef.current.scale.copy(leftEyeBaseScale.current);
      }

      if (rightEyeRef.current) {
        rightEyeRef.current.scale.copy(rightEyeBaseScale.current);
      }
    };
  }, [scene]);

  useEffect(() => {
    if (!names.length) {
      console.warn("No animations found in this GLB.");
      setReady(true);
      return;
    }

    console.log("Animation clips:", names);

    const action = actions["TypingIdle"] || actions[names[0]];

    if (!action) {
      console.warn("No valid animation action found.");
      setReady(true);
      return;
    }

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.enabled = true;
    action.play();
    // Only advance while the canvas is hovered — see useFrame below.
    action.paused = true;

    actionRef.current = action;

    // Apply first animation pose before showing the model.
    mixer.update(0);
    setReady(true);

    return () => {
      action.stop();
      actionRef.current = null;
    };
  }, [actions, names, mixer]);

  useFrame((_, delta) => {
    if (actionRef.current) {
      actionRef.current.paused = !hoveredRef.current;
    }

    const targetSquint = hoveredRef.current ? 1.0 : 0.28;
    const speed = 12;

    const updateEye = (eye, baseScale) => {
      if (!eye) return;

      const targetScale = baseScale.clone();
      targetScale[SQUINT_AXIS] = baseScale[SQUINT_AXIS] * targetSquint;

      eye.scale.lerp(targetScale, 1 - Math.exp(-speed * delta));
    };

    updateEye(leftEyeRef.current, leftEyeBaseScale.current);
    updateEye(rightEyeRef.current, rightEyeBaseScale.current);
  });

  return (
    <group ref={group} visible={ready}>
      <primitive object={scene} />
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <shadowMaterial transparent opacity={0.35} />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.9} groundColor="#444444" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
    </>
  );
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("SceneCanvas failed to load model:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-center text-sm text-muted px-6">
          Couldn't load the 3D model. Place your exported file at{" "}
          <code className="mx-1 px-1 rounded bg-surface">
            public/models/scene.glb
          </code>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function SceneCanvas({ modelUrl, bgColor = "#111111" }) {
  const controlsRef = useRef();
  const hoveredRef = useRef(false);

  return (
    <SceneErrorBoundary>
      <Canvas
        shadows
        camera={{
          position: [0.05098581222734307, 1.1097237329797514, 3.8282221181970497],
          fov: 35,
        }}
        dpr={[1, 2]}
        onPointerEnter={() => {
          hoveredRef.current = true;
          if (controlsRef.current) controlsRef.current.autoRotate = true;
        }}
        onPointerLeave={() => {
          hoveredRef.current = false;
          if (controlsRef.current) controlsRef.current.autoRotate = false;
        }}
      >
        <color attach="background" args={[bgColor]} />

        <Lights />

        <Suspense fallback={null}>
          <Model url={modelUrl} hoveredRef={hoveredRef} />

          <Floor />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2 - 0.05}
          target={[0.0024660705042833797, 0.6, -0.21509873959994263]}
          autoRotate={false}
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </SceneErrorBoundary>
  );
}
