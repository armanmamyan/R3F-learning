import {useRef, useState} from 'react'
import ReactDOM from "react-dom/client";
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import "./style.css";
import Stage from './Stage';

const root = ReactDOM.createRoot(document.querySelector("#root"));

// First method for set canvas background, by using renderer setClearColor 
//and onCreated method on canvas
const created = ({gl, scene}) => {
  // V1
  // gl.setClearColor('red', 1);
  
  // V2 putting a background on the scene instead of changing renderer color
  scene.background = new THREE.Color('red')
}

root.render(
  <>
    <Canvas
      shadows={false}
      camera={{
        fov: 45,
        near: 0.01,
        far: 200,
        position: [-4,3,6]
      }}
      // onCreated={created}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

    </Canvas>
  </>
);
