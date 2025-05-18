import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, forwardRef } from 'react';

type CharacterProps = {
  animation?: string;
  [key: string]: any;
};

export const Character = forwardRef<any, CharacterProps>(
  ({ animation = "Idle", ...props }, ref) => {
    const { scene, animations } = useGLTF('/models/Soldier.glb');
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
      if (actions && animation && actions[animation]) {
        actions[animation].reset().fadeIn(0.2).play();
        return () => actions[animation].fadeOut(0.2);
      }
    }, [animation, actions]);

    return (
      <primitive object={scene} ref={ref} {...props} />
    );
  }
);

useGLTF.preload('/models/Soldier.glb');