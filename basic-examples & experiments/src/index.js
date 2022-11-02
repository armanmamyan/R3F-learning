import "./style.css";
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import * as THREE from 'three'
import Torus from './Torus';

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 1000,
  position: [3,2,6]
}

root.render(
  <>
    <Canvas
      dpr={
        [1,2] // Min and Max DPR value
      }
       camera={ {
           fov: 45,
           near: 0.1,
           far: 200,
           position: [ 3, 2, 6 ]
       } }
    >
      <Torus />
    </Canvas>
  </>
);
