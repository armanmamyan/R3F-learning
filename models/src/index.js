import "./style.css";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Models from './Models';

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.01,
        far: 200,
        position: [-4,3,6]
      }}
      // onCreated={created}
    >
      <Models />
    </Canvas>
  </>
);
