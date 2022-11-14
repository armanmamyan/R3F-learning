import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const Model = () => {
    const model = useLoader(
        GLTFLoader,
        './FlightHelmet/glTF/FlightHelmet.gltf'
    )

    return <primitive object={ model.scene } scale={ 5 } position-y={ - 1 } />
}

export default Model;