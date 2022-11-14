import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import Hamburger from './Hamburger.js'
import { Suspense } from "react";
import { Perf } from "r3f-perf";
import AnimatedModel from './AnimatedModel';

const Torus = () => {
  // const model = useLoader(GLTFLoader, './hamburger.glb');
  // const model = useLoader(
  //   GLTFLoader,
  //   './FlightHelmet/glTF/FlightHelmet.gltf',
  //   (loader) => {
  //     const draco = new DRACOLoader();
  //     draco.setDecoderPath('./draco/');
  //     loader.setDRACOLoader(draco);
  //   }
  //   );

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={ 0.04 } />
      <ambientLight intensity={0.5} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Suspense fallback={<LoadingObject />}>
        <AnimatedModel/>
      </Suspense>
    </>
  );
};

const LoadingObject = () => (
  <mesh position-y={0.5} scale={[2, 3, 2]}>
    <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
    <meshBasicMaterial wireframe color="red" />
  </mesh>
);

export default Torus;
