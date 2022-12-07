import "./style.css";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Model from './Model';

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      shadows
    >
      <Model />
    </Canvas>
  </>
);
