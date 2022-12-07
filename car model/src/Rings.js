import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from 'three'


const Rings = () => {
    const ringsRef = useRef([]);

    useFrame((state, delta) => {
        let elapsed = state.clock.getElapsedTime();

        for (let i = 0; i < ringsRef.current.length; i++) {
            const mesh = ringsRef.current[i];
            const z = (i - 7) * 3.5 - ((elapsed * 0.4) % 3.5) * 2; // posiitioning back and forth (3.5 for adding gap between rings)
            const dest = Math.abs(z); // Check destintation of the ring. how far from the center

            mesh.position.z = z;
            mesh.scale.set(1 - dest * 0.04,1 - dest * 0.04,1 - dest * 0.04) // As the destination gets bigger, we will scale it down.

            let colorScale = 1;

            if(dest > 2) {
                colorScale = 1 - (Math.min(dest, 12) - 2) / 10; // modulating intensity of the color
            }

            colorScale += 0.5

            if(i % 2 === 1) {
                mesh.material.emissive = new Color(6,0.15,0.7).multiplyScalar(colorScale); // Fadding out color
            } else {
                mesh.material.emissive = new Color(0.1, 0.9, 4).multiplyScalar(colorScale); // Fadding out color
            }

        }
    })

    return (
        <>
            {[...Array(14)].map((i,index) => (
                <mesh
                    castShadow
                    receiveShadow
                    key={`${Math.random()}_ring_${i}`}
                    ref={element => ringsRef.current[index] = (element)}
                >
                    <torusGeometry args={[3.35,0.05,16,100]} />
                    <meshStandardMaterial emissive={[0.5,0.5,0.5]} color={[0,0,0]} />
                </mesh>
            ))}
        </>
    )
}

export default Rings;