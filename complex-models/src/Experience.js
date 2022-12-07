import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial
} from "@react-three/drei";
import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";

const PortalMaterial = shaderMaterial({
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
);

extend({PortalMaterial});

export default function Experience() {
  const portalRef = useRef(null);
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTextures = useTexture("./model/baked.jpg");

  bakedTextures.flipY = false;

  useFrame((state,delta) => {
    const { uTime } = portalRef.current.uniforms;
    uTime.value += delta;
  })

  return (
    <>
      <color args={["#201919"]} attach="background" />
      <OrbitControls makeDefault />
      <Center>
        {/* Baked scene */}
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTextures} />
        </mesh>

        {/* Lights */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>

        {/* Portal */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalRef} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
}
