import { useRef, useState } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
const SpawnButton = styled.button`
  padding: 0.6em 1.2em;
  font-size: 1.1em;
  border-radius: 0.5em;
  border: none;
  background: linear-gradient(90deg, #4f8cff 0%, #38e8ff 100%);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    transform 0.1s;
`;

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;
}

function randomSize() {
  return 0.2 + Math.random() * 0.5;
}

function randomPosition() {
  const x = Math.random() * 2 - 1; // -1 bis 1 um den Trigger
  const y = 2 + Math.random() * 2; // 2 bis 4 (über dem Trigger)
  const z = 10 + (Math.random() * 2 - 1); // -1 bis 1 um z=10
  return [x, y, z];
}

type Ball = { color: string; size: number; position: [number, number, number] };

export default function BallSpawner() {
  const [balls, setBalls] = useState<Ball[]>([]);
  const triggerActive = useRef(false);

  const spawnBall = () => {
    setBalls((prev) => [
      ...prev,
      {
        color: randomColor(),
        size: randomSize(),
        position: randomPosition() as [number, number, number],
      },
    ]);
  };

  //#region Trigger-Handler
  const handleTriggerEnter = () => {
    if (!triggerActive.current) {
      triggerActive.current = true;
      spawnBall();
    }
  };
  const handleTriggerExit = () => {
    triggerActive.current = false;
  };
  //#endregion
  //#region return
  return (
    <>
      {/* Button knapp über dem Trigger */}
      <Html position={[0.2, 1.7, 10]} style={{ pointerEvents: 'auto' }}>
        <SpawnButton
          onClick={spawnBall}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Ball spawner (Klick mich oder lauf in mich)
        </SpawnButton>
      </Html>

      {/* Unsichtbarer Trigger im Raum */}
      <RigidBody type="fixed" colliders={false} position={[0, 0, 10]}>
        <CuboidCollider
          args={[0.5, 0.5, 0.5]}
          position={[0, 1, 0]}
          sensor
          onIntersectionEnter={handleTriggerEnter}
          onIntersectionExit={handleTriggerExit}
        />
      </RigidBody>

      {/* Die Bälle */}
      {balls.map((ball, i) => (
        <RigidBody key={i} colliders="ball" position={ball.position}>
          <mesh>
            <sphereGeometry args={[ball.size, 32, 32]} />
            <meshStandardMaterial color={ball.color} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}
