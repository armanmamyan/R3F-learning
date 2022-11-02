import { useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useRef } from "react";
import CustomObject from './CustomGeometry';

extend({ OrbitControls });

const Torus = () => {
  const boxRef = useRef(null);
  const groupRef = useRef(null);
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    // Animating Camera
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0,0,0)

    boxRef.current.rotation.y += delta;
    groupRef.current.rotation.y += delta;
  });

  return (
    <>
      <directionalLight />
      <ambientLight intensity={0.5} />
      <orbitControls args={[camera, gl.domElement]} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
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
      <CustomObject/>
    </>
  );
};

export default Torus;
