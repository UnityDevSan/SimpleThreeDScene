// Scene/Scene.tsx
import { OrbitControls, KeyboardControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from './Character/Character';
import { styled } from 'styled-components';
import DefaultLights from './Lights/DefaultLights';
import {
  AxesHelper,
  CubeInstances,
  GridHelper,
  GroundPlane,
} from './Environment';
import { useCharacterStore } from './Character/Hooks/useCharacterStore';
import { Physics } from '@react-three/rapier';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { CUBE_POSITIONS } from '@/utils/constants';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  { name: 'run', keys: ['Shift'] },
];

const FullSizeCanvas = styled(Canvas)`
  width: 100vw !important;
  height: 100vh !important;
  display: block;
`;

export default function Scene() {
  const isMoving = useCharacterStore((s) => s.isMoving);
  const headTarget = useRef(new Vector3(0, 5, 0)); // z.B. 5 Einheiten über Boden (der pivot des Characters in der Fuß, wir wollen aber über den Kopf anvisieren)

  return (
    <KeyboardControls map={keyboardMap}>
      {/*
       * Bei performance issues disable antialiasing
       * Für bessere auflösung die devicePixelRatio anpassen(2 gute Bild Qualität, 1 unscharf)
       */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Physics>
          <DefaultLights />
          <OrbitControls
            // target={headTarget.current} //führt zu komischem wackeln, da follow cam nicht auf kopf fokusiert TODO: fix
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.2}
            enabled={!isMoving}
          />
          <Stats className="r3f-stats" />
          <Character />
          <GroundPlane />
          <AxesHelper size={5} />
          <GridHelper size={100} divisions={100} />
          <CubeInstances positions={CUBE_POSITIONS} />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
