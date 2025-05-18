import { useRef, useMemo } from 'react';
import { InstancedMesh, Object3D } from 'three';
import { useFrame } from '@react-three/fiber';
import CubeInstancedMesh from './CubeInstancedMesh';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

type CubeInstancesProps = {
  positions: [number, number, number][];
  size?: number;
  color?: string;
};

/**
 * Rendert eine Gruppe von Cubes als InstancedMesh für Performance.
 * Jeder Cube erhält einen eigenen Physik-Body (RigidBody + Collider).
 * 
 * @param positions Array mit Positionen für die Cubes
 * @param size      Kantenlänge der Cubes (default: 1)
 * @param color     Farbe der Cubes (default: #4cf)
 */
export default function CubeInstances({
  positions,
  size = 1,
  color = '#4cf',
}: CubeInstancesProps) {
  // Ref auf das InstancedMesh für direkte Manipulation
  const meshRef = useRef<InstancedMesh>(null);
  // Dummy-Objekt zum Setzen der Matrix für jede Instanz
  const dummy = useMemo(() => new Object3D(), []);

  // Aktualisiere die Positionen der Instanzen bei jedem Frame
  useFrame(() => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.set(...pos);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* Erzeuge für jede Position einen festen Physik-Body mit Collider */}
      {positions.map((pos, i) => (
        <RigidBody key={i} type="fixed" colliders={false} position={pos}>
          <CuboidCollider args={[size / 2, size / 2, size / 2]} />
        </RigidBody>
      ))}
      {/* Rendere alle Cubes als InstancedMesh für Performance */}
      <CubeInstancedMesh
        ref={meshRef}
        count={positions.length}
        size={size}
        color={color}
      />
    </>
  );
}