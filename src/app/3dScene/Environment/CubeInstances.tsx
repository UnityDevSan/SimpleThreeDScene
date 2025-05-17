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
