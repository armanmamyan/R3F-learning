import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { DoubleSide, RepeatWrapping, sRGBEncoding } from "three";

const Main = () => {
  const boxRef = useRef(null);
  const { camera, gl } = useThree();
  const heightMap = useTexture("./uluru-heightmap.png");
  heightMap.encoding = sRGBEncoding;
  heightMap.wrapS = RepeatWrapping;
  heightMap.wrapT = RepeatWrapping;
  heightMap.anisotropy = 16;

  const textureMap = useTexture("/download.png");
  // Apply some properties to ensure it renders correctly
  textureMap.encoding = sRGBEncoding;
  textureMap.wrapS = RepeatWrapping;
  textureMap.wrapT = RepeatWrapping;
  textureMap.anisotropy = 16;


  return (
    <>
      <OrbitControls />
      <group>
        <mesh rotation-x={-Math.PI * 0.5} scale={[1 / 1024, 1 / 1024, 1 / 1024]}>
          <planeBufferGeometry args={[1024, 1024, 256, 256]} />
          <shaderMaterial
            uniforms={{
              bumpTexture: { value: heightMap },
              bumpScale: { value: 50 },
              terrainTexture: { value: textureMap }
            }}
            vertexShader={`
          uniform sampler2D bumpTexture;
          uniform float bumpScale;
        
          varying float vAmount;
          varying vec2 vUV;
          
          void main()
          {
              vUV = uv;
          
              vec4 bumpData = texture2D(bumpTexture, uv);
          
              vAmount = bumpData.r;
          
              vec3 newPosition = position + normal * bumpScale * vAmount;
          
              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
          `}
            fragmentShader={`
                uniform sampler2D terrainTexture;
                varying vec2 vUV;
                varying float vAmount;
        
                void main()
                {
                    gl_FragColor = texture2D(terrainTexture, vUV);
                }
        `}
            side={DoubleSide}
          />
        </mesh>
        <ToolTip1 />
        <ToolTip2 />
        <ToolTip3 />
      </group>
    </>
  );
};

function ToolTip1() {
  return (
    <Html center position={[-1, 1, -1]}>
      <p>Click and drag on the white part to move the camera</p>
    </Html>
  );
}

function ToolTip2() {
  return (
    <Html center position={[1, -1, -1]}>
      <p>Scroll to zoom in and out</p>
    </Html>
  );
}

function ToolTip3() {
  return (
    <Html center position={[-1, -1, 1]}>
      <p>{"<== Code's on the left, with details in the comments"}</p>
    </Html>
  );
}

export default Main;
