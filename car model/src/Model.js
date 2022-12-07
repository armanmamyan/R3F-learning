import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Ground from "./Ground";
import Rings from "./Rings";
import Boxes from "./Box";
import { BlendFunction } from "postprocessing";
import FloatingGrid from "./FloatingGrid";

const Model = () => {
  const model = useLoader(GLTFLoader, "./models/car/scene.gltf");

  useEffect(() => {
    model.scene.scale.set(0.005, 0.005, 0.005);
    model.scene.position.set(0, -0.035, 0);
    model.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [model]);


  useFrame((state, delta) => {
    let ellapsedTime = state.clock.getElapsedTime();
    let group = model.scene.children[0].children[0].children[0];

    group.children[0].rotation.x = ellapsedTime * 2
    group.children[2].rotation.x = ellapsedTime * 2
    group.children[4].rotation.x = ellapsedTime * 2
    group.children[6].rotation.x = ellapsedTime * 2
  })

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Canvas Background */}
      <color args={[0, 0, 0]} attach="background" />

      {/* Spot Lights */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Ground */}
      <Ground />

      {/* Rings */}
      <Rings />

   
    <Boxes/>


      <CubeCamera resolution={256} frames={10}>
        {/* Cube Camera will be updated on each frame  */}
        {/* texture prop comes from CubeCamera and it's a what cube camera rendered on that frame */}
        {/* We're going use that snapshot as Env Map */}
        {(texture) => (
          <>
            <Environment map={texture} />
            <primitive object={model.scene} />
          </>
        )}
      </CubeCamera>


      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>

      <FloatingGrid/>

    </>
  );
};

useGLTF.preload("./models/car/scene.gltf");

export default Model;
