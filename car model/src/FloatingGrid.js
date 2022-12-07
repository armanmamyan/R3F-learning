import { useTexture, } from "@react-three/drei"
import { RepeatWrapping } from "three";
import { useFrame, useLoader } from "@react-three/fiber";


const FloatingGrid = () => {
    const diffuse = useTexture('textures/grid-texture.png', (texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.anisotropy = 4;
        texture.repeat.set(30,30);
        texture.offset.set(0,0)
    });

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 0.68;
        diffuse.offset.set(0, t);
      });

    return (
        <>
            <mesh rotation-x={-Math.PI * 0.5} position={[0,0.425,0]}>
                <planeGeometry args={[35,35]}/>
                <meshBasicMaterial 
                    color={[1,1,1]}
                    opacity={0.15}
                    map={diffuse}
                    alphaMap={diffuse}
                    transparent={true}
                />
            </mesh>
        </>
    )
}

export default FloatingGrid