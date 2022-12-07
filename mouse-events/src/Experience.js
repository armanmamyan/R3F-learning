import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF('./hamburger.glb');

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const objectsPreventPropogation = (e) => {
    e.stopPropagation();
  };

  const cubeClickHandler = (event) => {
    event.object.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);

    // Full list of Event Props in R3F
    {
      /**
        console.log('---')
        console.log('distance', event.distance) // Distance between camera and hit point
        console.log('point', event.point) // Hit point coordinates (in 3D)
        console.log('uv', event.uv) // UV coordinates on the geometry (in 2D)
        console.log('object', event.object) // The object that triggered the event
        console.log('eventObject', event.eventObject) // The object that was listening to the event (useful where there is objects in objects)

        console.log('---')
        console.log('x', event.x) // 2D screen coordinates of the pointer
        console.log('y', event.y) // 2D screen coordinates of the pointer

        console.log('---')
        console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
        console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
        console.log('metaKey', event.metaKey) // If the COMMAND key was pressed
    */
    }
  };

  {
    /** Event specifiers
    
    onContextMenu --> On a mobile device, we can display that menu by pressing down for some time
    
    onDoubleClick --> The delay between the first and second click/tap is defined by the OS
    
    onPointerDown --> is triggered when we’ve just clicked or put our finger down
    
    onPointerUp --> is triggered when we release the click (left or right) or touch
    
    onPointerOver and onPointerEnter --> The event is triggered when the cursor or finger just went above the object. 
            In native JavaScript, the mouseover event is slightly different than the mouseenter because it keeps triggering the event while the cursor enters children of the element being tested.
    
    onPointerOut and onPointerLeave -->The event is triggered when the cursor or finger just went out from the object

    onPointerMove --> is triggered with each frame if the cursor has moved since the last frame, while above the object

    onPointerMissed --> let you know if the user clicks outside of the object But onPointerMissed is a bit special since we can add it on the <Canvas> and it will be triggered if we click (when the click is released) but none of the listen objects have registered a hit:

    */
  }

  {
    /** 
        Event handling tricky part || OCCLUDING
        If you move the camera so that the sphere occludes the cube and click where the cube is supposed to be,
        you’ll see that the event was registered. By default, the Raycaster doesn’t care about what’s in front of the object being tested

        To fix that, you need to handle all objects events, and stop propogation.
    */
  }

  {
    /**
        Changing cursor to pointer on hover case
        
        For that you should use onPointerEnter and onPointerLeave and change document.body style to pointer
    */
  }

  {/**
    Optimisations
        Avoid events that need to be tested on each frame if possible: 
        onPointerOver, onPointerEnter, onPointerOut, onPointerLeave, onPointerMove
    
        Try to minimise the number of objects that listen to events and avoid testing complex geometries. 
        If you notice a freeze, even a short one when interacting, you’ll have some more optimisation to do.

    If you have very complex geometries and still need the pointer events to be accurate, 
    you can also use the BVH (Bounding Volume Hierarchy).
    It’s a much more complex approach, but made easy with the useBVH helper from drei.


    
*/}

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={-2} onClick={objectsPreventPropogation} onPointerEnter={objectsPreventPropogation}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        onClick={cubeClickHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
            document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        onClick={objectsPreventPropogation}
        onPointerEnter={objectsPreventPropogation}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>

      <primitive
            object={ hamburger.scene }
            scale={ 0.25 }
            position-y={ 0.5 }
            onClick={objectsPreventPropogation}
            onPointerEnter={objectsPreventPropogation}
        />
    </>
  );
}
