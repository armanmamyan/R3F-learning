import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

const AnimatedModel = () => {
  const model = useGLTF("./Fox/glTF-Binary/Fox.glb");
  const animations = useAnimations(model.animations, model.scene);
  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    // The function is being called when we change the animationName, but the animation of the fox looks weird
    //  after we change it to the second animation and weirder if we change it to third animation.
    // The reason is that all animations are playing together and Three.js will mix them. 
    // First, you are seeing the Survey animation; then a mix of the Survey and the Walk animations;
    //  and finally a mix of the Survey, the Walk and the Run animations.
    // To fix that, we need to stop the old animation progressively (fadeOut) and start the new animation progressively (fadeIn).

    const action = animations.actions[animationName];
    action.reset().fadeIn(.5).play();

    return() => {
        action.fadeOut(.5)
    }

    // action.play();
    // setTimeout(() => {
    //     animations.actions.Walk.play();
    //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
    // }, 3000)
  }, [animationName]);

  return (
    <primitive
      object={model.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
};

export default AnimatedModel;
