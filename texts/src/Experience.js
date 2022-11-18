import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Experience = () => {
  const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
  const material = new THREE.MeshMatcapMaterial();
  const donuts = useRef([]);
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
        donut.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          SIMPLE TEXT
        </Text3D>
      </Center>

      {[...Array(100)].map((i, index) => (
          <mesh
            ref={element => donuts.current[index] = (element)}
            key={`Donut_${index}`}
            geometry={torusGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
    </>
  );
};

export default Experience;
