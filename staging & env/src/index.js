import "./style.css";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
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
      {/* R3F Color for canvas. The only parent of the color is a SCENE. It will be background property of the scene*/}
      {/* This code can be put anywhere as log as the direct parent is the SCENE */}
      <color args={['ivory']} attach='background' />
      <Stage />
    </Canvas>
  </>
);
