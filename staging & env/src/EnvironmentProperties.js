import {
  OrbitControls,
  useHelper,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Perf } from "r3f-perf";

import * as THREE from "three";

const Torus = () => {
  const boxRef = useRef(null);
  const dirRef = useRef(null);
  const { color, opacity, blur } = useControls("Contact Shadows", {
    color: "#1d8f75",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { envMapIntensity, envMapHeight, envMapScale, envMapRadius } = useControls("Env Map", {
    envMapIntensity: { value: 3.5, min: 1, max: 12 },
    envMapHeight: { value: 7, min: 1, max: 100 },
    envMapScale: { value: 100, min: 1, max: 1000 },
    envMapRadius: { value: 28, min: 1, max: 1000 },
  });
  // Adding Light helper
  useHelper(dirRef, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta * 0.2;
    // boxRef.current.position.x = 2 + Math.sin(state.clock.elapsedTime);
  });

  return (
    <>
      <Perf position="top-left" />
      <Environment
        // background
        preset="sunset"
        ground={{ height: envMapHeight, radius: envMapRadius, scale: envMapScale }}
        // resolution={32}
      >
        {/* <color args={["black"]} attach="background" />
        <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      </Environment>
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={1024}
        far={5}
        color={color}
        blur={blur}
        opacity={opacity}
      />
      <OrbitControls makeDefault />
      {/* <directionalLight
        castShadow
        ref={dirRef}
        position={sunPosition}
        intensity={0.8}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} /> */}
      <group>
        <mesh position-x={-2} castShadow position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial
            envMapIntensity={envMapIntensity}
            color="orange"
          />
        </mesh>
        <mesh
          castShadow
          ref={boxRef}
          position-x={2}
          position-y={1}
          scale={1.5}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial
            envMapIntensity={envMapIntensity}
            color="mediumpurple"
          />
        </mesh>
      </group>
      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          envMapIntensity={envMapIntensity}
          color="greenyellow"
        />
      </mesh> */}
    </>
  );
};

export default Torus;
