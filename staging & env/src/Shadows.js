import {
  OrbitControls,
  useHelper,
  BakeShadows,
  softShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows
} from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Perf } from "r3f-perf";

import * as THREE from "three";

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11
// })

const Torus = () => {
  const boxRef = useRef(null);
  const dirRef = useRef(null);
  const  {color, opacity, blur} = useControls('Contact Shadows', {
    color: "#1d8f75",
    opacity: {value: 0.5, min:0, max: 1},
    blur: {value: 2.8, min:0, max: 10},
  })
  // Adding Light helper
  useHelper(dirRef, THREE.DirectionalLightHelper, 1)

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta * 0.2;
    // boxRef.current.position.x = 2 + Math.sin(state.clock.elapsedTime);
  });

  return (
    <>
      <Perf position="top-left" />
      {/* <BakeShadows /> */}
      {/* <AccumulativeShadows 
      position={[0, -0.99, 0]} 
      scale={10}
      color='#316d39'
      opacity={.8}
      frames={Infinity} //how many shadow renders to do
      temporal //  spread renders across multiple frames
      blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          intensity={1}
          ambient={0.5}
          bias={0.001}
          position={[1, 2, 3]}
        />
      </AccumulativeShadows> */}
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={1024}
        far={5}
        frames={1}
        color={color}
        blur={blur}
        opacity={opacity}
      />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        ref={dirRef}
        position={[1, 2, 3]}
        intensity={0.8}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />

      <group>
        <mesh position-x={-2} castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          castShadow
          ref={boxRef}
          position-x={2}
          scale={1.5}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default Torus;
