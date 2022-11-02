
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three'

const CustomObject = () => {
    const geomRef = useRef(null);
    const verticeCount = 10 * 3;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(verticeCount * 3);
        for (let i = 0; i < pos.length * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 3
        }
        return pos;
    }, [])

    useEffect(() => {
        geomRef.current?.computeVertexNormals();
    },[positions]);

    return (
        <mesh>
            <boxGeometry ref={geomRef}>
                <bufferAttribute attach='attributes-position' count={verticeCount} itemSize={3} array={positions} />
            </boxGeometry>
            <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
    )
}


export default CustomObject