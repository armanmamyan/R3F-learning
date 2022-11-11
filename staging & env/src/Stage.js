import {
  OrbitControls,
  useHelper,
  ContactShadows,
  Environment,
  Stage,
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

  const { envMapIntensity, envMapHeight, envMapScale, envMapRadius } =
    useControls("Env Map", {
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
      <OrbitControls makeDefault />
      <Stage
        contactShadow={{
          opacity: 0.2,
          blur: 3
        }}
        environment='sunset'
        intensity={0.5}
        preset='portrait'
      >
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
      </Stage>
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
