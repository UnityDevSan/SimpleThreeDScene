import { useMemo, useRef } from 'react';
import { useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry } from 'three';
import { useControls } from 'leva';

export function RapierDebugLines() {
  const { world } = useRapier();
  const geometryRef = useRef<BufferGeometry | null>(null);
  // Leva UI control to toggle the visibility of mesh colliders in the debug view
  const { showMeshCollider } = useControls({
    showMeshCollider: {
      value: true,
      label: 'show Mesh Collider',
    },
  });
  useFrame(() => {
    if (world && world.debugRender) {
      const { vertices, colors } = world.debugRender();
      if (geometryRef.current) {
        geometryRef.current.setAttribute(
          'position',
          new BufferAttribute(new Float32Array(vertices), 3)
        );
        geometryRef.current.setAttribute(
          'color',
          new BufferAttribute(new Float32Array(colors), 3)
        );
        geometryRef.current.setDrawRange(0, vertices.length / 3);
      }
    }
  });

  return showMeshCollider ? (
    <lineSegments>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial vertexColors />
    </lineSegments>
  ) : (
    ''
  );
}
