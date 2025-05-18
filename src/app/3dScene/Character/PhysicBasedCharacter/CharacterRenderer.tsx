import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, forwardRef } from 'react';
import { Mesh } from 'three';

type CharacterProps = {
  animation?: string;
  [key: string]: any;
};

/**
 * Character-Komponente für ein animiertes 3D-Modell.
 *
 * Props:
 * - animation: Name der Animation, die abgespielt werden soll (Default: "Idle")
 * - ...props: Weitere Props werden an das primitive Objekt weitergereicht
 */
export const CharacterRenderer = forwardRef<any, CharacterProps>(
  ({ animation = 'Idle', ...props }, ref) => {
    // Lade das 3D-Modell und die Animationen
    const { scene, animations } = useGLTF('/models/Soldier.glb');
    const { actions } = useAnimations(animations, scene);
    // Setze castShadow für alle Meshes im Model
    useEffect(() => {
      scene.traverse((obj) => {
        if ((obj as Mesh).isMesh) {
          (obj as Mesh).castShadow = true;
        }
      });
    }, [scene]);
    // Spiele die gewünschte Animation ab, wenn sie sich ändert
    useEffect(() => {
      if (!actions || !animation || !actions[animation]) return;
      actions[animation].reset().fadeIn(0.2).play();
      return () => {
        if (actions && actions[animation]) {
          actions[animation].fadeOut(0.2);
        }
      };
    }, [animation, actions]);

    // Rendere das geladene Modell als primitive
    return <primitive object={scene} ref={ref} {...props} />;
  }
);

useGLTF.preload('/models/Soldier.glb');
