/**
 * @param count - Number of cube instances to render.
 * @param size - Optional size of each cube (default is 1).
 * @param color - Optional color of the cubes (default is "#4cf").
 * 
 * @remarks
 * This component is useful for efficiently rendering many identical cubes in a 3D scene.
 */
import { forwardRef } from "react";
import { InstancedMesh } from "three";

type CubeInstancedMeshProps = {
  count: number;
  size?: number;
  color?: string;
};

const CubeInstancedMesh = forwardRef<InstancedMesh, CubeInstancedMeshProps>(
  ({ count, size = 1, color = "#4cf" }, ref) => (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, count]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </instancedMesh>
  )
);

export default CubeInstancedMesh;