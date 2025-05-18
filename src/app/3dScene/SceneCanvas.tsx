// Scene/Scene.tsx
import { OrbitControls, KeyboardControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import AnimationBasedCharacter from './Character/PhysicBasedCharacter/AnimationBasedCharacter';
import DefaultLights from './Lights/DefaultLights';

import { useCharacterStore } from './Character/AnimationBasedCharacter/Hooks/useCharacterStore';
import { Physics } from '@react-three/rapier';
import { useRef } from 'react';
import { Object3D, Vector3 } from 'three';
import { RapierDebugLines } from './Helpers/RapierDebugLines';
import { useControls } from 'leva';
import { PhysicBasedCharacter } from './Character/PhysicBasedCharacter/PhysicBasedCharacter';
import Level1 from './Levels/Level1';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  { name: 'run', keys: ['Shift'] },
  { name: 'jump', keys: [' ', 'Space', 'Spacebar'] },
];
export default function Scene() {
  const isMoving = useCharacterStore((s) => s.isMoving);
  const { useAnimationBasedCharacter } = useControls({
    useAnimationBasedCharacter: {
      value: false,
      label: 'Animation-based Character',
    },
  });
  return (
    <KeyboardControls map={keyboardMap}>
      {/*
       * Bei performance issues disable antialiasing
       * Für bessere auflösung die devicePixelRatio anpassen(2 gute Bild Qualität, 1 unscharf)
       */}
      <Canvas
        onContextMenu={(e) => e.preventDefault()}
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Physics>
          <DefaultLights />
          <Stats className="r3f-stats" />
          {useAnimationBasedCharacter ? (
            <>
              <AnimationBasedCharacter />
              <OrbitControls
                // target={headTarget.current} //führt zu komischem wackeln, da follow cam nicht auf kopf fokusiert TODO: fix
                enablePan={true}
                enableZoom={true}
                maxPolarAngle={Math.PI / 2.2}
                enabled={!isMoving}
              />
            </>
          ) : (
            <PhysicBasedCharacter />
          )}
          <Level1 />
          <RapierDebugLines />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
