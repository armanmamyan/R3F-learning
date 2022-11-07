import "./style.css";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import ReactDOM from "react-dom/client";
import Torus from './Torus';
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <Leva collapsed/>
    <Canvas>
      <Torus />
    </Canvas>
  </StrictMode>
);
