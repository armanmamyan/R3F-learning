import "./style.css";
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Torus from './Torus';

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas>
      <Torus />
    </Canvas>
  </>
);
