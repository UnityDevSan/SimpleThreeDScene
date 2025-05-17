import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';

type ElevatorProps = {
  position?: [number, number, number];
  size?: [number, number, number];
  height?: number; // Wie hoch fährt der Elevator?
  speed?: number; // Geschwindigkeit des Elevators
  color?: string;
  characterRef: React.RefObject<THREE.Group>;
};

export default function Elevator({
  position = [0, 0.5, 0],
  size = [2, 0.2, 2],
  height = 5,
  speed = 1,
  color = '#aaa',
  characterRef,
}: ElevatorProps) {
  const [active, setActive] = useState(false);
  const [atTop, setAtTop] = useState(false);
  const platformRef = useRef<THREE.Mesh>(null);

  // Helper: Prüft, ob Character auf Plattform steht (AABB)
  function isCharacterOnPlatform() {
    if (!characterRef.current || !platformRef.current) return false;
    const charPos = characterRef.current.position;
    const platPos = platformRef.current.position;
    const [w, h, d] = size;
    // Prüfe nur X/Z (Y ist Höhe)
    return (
      Math.abs(charPos.x - platPos.x) < w / 2 &&
      Math.abs(charPos.z - platPos.z) < d / 2 &&
      Math.abs(charPos.y - (platPos.y + h / 2)) < 0.5 // Character steht auf Plattform
    );
  }

useFrame((_, delta) => {
  if (!platformRef.current) return;
  const plat = platformRef.current;
  const [x, baseY, z] = position;

  // Prüfe, ob Character auf Plattform steht
  const onPlatform = isCharacterOnPlatform();

  // Elevator fährt hoch, solange Character drauf steht
  if (onPlatform && !atTop) setActive(true);
  if (!onPlatform && atTop) setActive(false);

  // Merke alte Y-Position
  const oldY = plat.position.y;

  // Bewegung
  if (active && plat.position.y < baseY + height) {
    plat.position.y += speed * delta;
    if (plat.position.y >= baseY + height) {
      plat.position.y = baseY + height;
      setAtTop(true);
    }
  } else if (!active && plat.position.y > baseY) {
    plat.position.y -= speed * delta;
    if (plat.position.y <= baseY) {
      plat.position.y = baseY;
      setAtTop(false);
    }
  }

  // === Character mitbewegen, wenn auf Plattform ===
  if (onPlatform && characterRef.current) {
    const deltaY = plat.position.y - oldY;
    characterRef.current.position.y += deltaY;
  }
});
  return (
    <RigidBody type="kinematicPosition" colliders={false}>
      <mesh ref={platformRef} position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      <CuboidCollider
        args={size.map((s) => s / 2) as [number, number, number]}
      />
    </RigidBody>
  );
}
