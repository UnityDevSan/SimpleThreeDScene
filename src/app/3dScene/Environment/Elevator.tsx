import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from '@react-three/rapier';

type ElevatorProps = {
  position?: [number, number, number];
  size?: [number, number, number];
  height?: number;
  speed?: number;
  color?: string;
};

export default function Elevator({
  position = [0, 0, 0],
  size = [2, 0.2, 2],
  height = 5,
  speed = 1,
  color = '#aaa',
}: ElevatorProps) {
  const [active, setActive] = useState(false); // is someone on it?
  const [atTop, setAtTop] = useState(false);
  const [goingDown, setGoingDown] = useState(false);
  const rigidRef = useRef<RapierRigidBody>(null);
  const waitTimeout = useRef<NodeJS.Timeout | null>(null);

  useFrame((_, delta) => {
    if (!rigidRef.current) return;
    const [x, baseY, z] = position;
    let nextY = rigidRef.current.translation().y;

    if (active && nextY < baseY + height) {
      nextY += speed * delta;
      if (nextY >= baseY + height) {
        nextY = baseY + height;
        setAtTop(true);
      }
      setGoingDown(false);
    } else if (goingDown && nextY > baseY) {
      nextY -= speed * delta;
      if (nextY <= baseY) {
        nextY = baseY;
        setAtTop(false);
        setGoingDown(false);
      }
    }

    rigidRef.current.setNextKinematicTranslation({ x, y: nextY, z });
  });
//#region Handlers
  const handleEnter = () => {
    setActive(true);
    setGoingDown(false);

    // falls Timer aktiv ist, abbrechen
    if (waitTimeout.current) {
      clearTimeout(waitTimeout.current);
      waitTimeout.current = null;
    }
  };

  const handleExit = () => {
    setActive(false);

    // Timer abbrechen, falls schon einer läuft
    if (waitTimeout.current) {
      clearTimeout(waitTimeout.current);
      waitTimeout.current = null;
    }

    // Immer runterfahren, egal ob oben oder unterwegs
    waitTimeout.current = setTimeout(() => {
      setGoingDown(true);
    }, 3000); // 3 Sekunden warten
  };

  //#endregion
  // Cleanup beim Unmount
  useEffect(() => {
    return () => {
      if (waitTimeout.current) clearTimeout(waitTimeout.current);
    };
  }, []);

  //#region return
  return (
    <RigidBody
      ref={rigidRef}
      type="kinematicPosition"
      colliders={false}
      position={position}
    >
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Hauptcollider */}
      <CuboidCollider
        args={[size[0] / 2, 0.001, size[2] / 2]}
        position={[0, 0.001, 0]}
      />

      {/* Sensor Collider */}
      <CuboidCollider
        args={size.map((s) => s / 4) as [number, number, number]}
        position={[0, (size[1] + 0.2) / 2, 0]}
        sensor
        onIntersectionEnter={handleEnter}
        onIntersectionExit={handleExit}
      />
    </RigidBody>
  );
}
