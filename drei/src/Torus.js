import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  MeshReflectorMaterial
} from "@react-three/drei";
import { useRef } from "react";

const Torus = () => {
  const boxRef = useRef(null);
  const sphereRef = useRef(null)
  const groupRef = useRef(null);

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <PivotControls
          anchor={[0, 0, 0]}
          depthTest={false}
          lineWidth={4}
          axisColors={["#9381ff", "#ff4d6d", "#7a582"]}
        >
          <mesh ref={sphereRef} position-x={-2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
            <Html
              position={[1, 1, 0]}
              wrapperClass="label"
              center
              distanceFactor={10}
              occlude={[sphereRef,boxRef]}
            >
              Text
            </Html>
          </mesh>
        </PivotControls>
        <mesh
          ref={boxRef}
          position-x={2}
          scale={1.5}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={boxRef} />
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial resolution={512} blur={[1000,1000]} mixBlur={1} mirror={0.75} color='greenyellow' />
      </mesh>
    </>
  );
};

export default Torus;
