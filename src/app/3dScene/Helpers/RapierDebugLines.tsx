import { useMemo, useRef } from 'react';
import { useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry } from 'three';

export function RapierDebugLines() {
  const { world } = useRapier();
  const geometryRef = useRef<BufferGeometry | null>(null);

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

  return (
    <lineSegments>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial vertexColors />
    </lineSegments>
  );
}