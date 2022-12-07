import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";


export const Box = ({color}) => {
    const box = useRef();
    const timeRef = useRef(0);
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(),2.0) * 0.5 + 0.05);
    const [position, setPosition] = useState(getInitialPosition());

    function getInitialPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
        if(v.x < 0) v.x -= 1.75;
        if(v.x > 0) v.x += 1.75;
    
        return v;
      }

    function resetPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 10 + 10); 
        if(v.x < 0) v.x -= 1.75;
        if(v.x > 0) v.x += 1.75;
    
        return v;
      }


    useFrame((state,delta) => {

        // Illustion that we are creating new boxes during motion
        timeRef.current += delta * 1.2;
        let newZ = position.z - timeRef.current;
        
        if(newZ < -10) {{
            setPosition(resetPosition);
            timeRef.current = 0;
        }}

        box.current.position.set(position.x, position.y, newZ);
        box.current.rotation.x += delta * xRotSpeed;
        box.current.rotation.y += delta * yRotSpeed;
    }, [xRotSpeed,yRotSpeed, position])

    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    )
}

const Boxes = () => (
    <>
    {[...Array(100)].map((i,index) => (
        <Box key={index} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4] } />
    ))}
    </>
)

export default Boxes