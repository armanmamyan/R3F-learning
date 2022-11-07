import {
  OrbitControls,
} from "@react-three/drei";
import { useControls, button } from 'leva'
import { useRef } from "react";
import { Perf } from 'r3f-perf'

const Torus = () => {
  const boxRef = useRef(null);
  const sphereRef = useRef(null)
  const groupRef = useRef(null);
  const {position, color, visible, perfVisible} = useControls('sphere',{
    position: {
      value: {x: -2, y: 0},
      min: -4,
      max: 4,
      step:0.01,
      joystick: 'invertY'
    },
    color: '#ff0000',
    visible: true,
    clickMe: button((e) => {console.log('e')}),
    choice: {options: ['a','b','c']},
    perfVisible: false,
  });

  const { scale } = useControls('cube', {
    scale:
    {
        value: 1.5,
        step: 0.01,
        min: 0,
        max: 5
    }
})
  
  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      <directionalLight />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
      <mesh ref={sphereRef} position={[position.x,position.y,0]} visible={visible}>
            <sphereGeometry />
            <meshStandardMaterial color={color} />
          </mesh>
        <mesh
          ref={boxRef}
          position-x={2}
          scale={scale}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default Torus;
