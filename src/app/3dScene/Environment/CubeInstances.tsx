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
 * Renders multiple cube instances at specified positions using instanced rendering for performance.
 * Each cube is represented visually and has a corresponding physics collider.
 *
 * @param positions - Array of 3D positions for each cube instance.
 * @param size - Optional size of each cube (default is 1).
 * @param color - Optional color of the cubes (default is '#4cf').
 */
/**
 * Updates the transformation matrices of each cube instance on every animation frame.
 *
 * The `useFrame` hook iterates over the `positions` array and sets the position of a shared dummy `Object3D`
 * for each instance. It then updates the instance's transformation matrix in the instanced mesh using `setMatrixAt`.
 * After all matrices are updated, it flags the instance matrix as needing an update so that the changes
 * are rendered in the next frame.
 *
 * Dies sorgt dafür, dass alle Instanzen der Würfel ihre Positionen korrekt im 3D-Raum erhalten und bei jeder
 * Animation entsprechend aktualisiert werden.
 */
export default function CubeInstances({
  positions,
  size = 1,
  color = '#4cf',
}: CubeInstancesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

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
      {positions.map((pos, i) => (
        <RigidBody key={i} type="fixed" colliders={false} position={pos}>
          <CuboidCollider args={[size / 2, size / 2, size / 2]} />
        </RigidBody>
      ))}
      <CubeInstancedMesh
        ref={meshRef}
        count={positions.length}
        size={size}
        color={color}
      />
    </>
  );
}
