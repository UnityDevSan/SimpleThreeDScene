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
      <boxGeometry args={[size, size*2, size]} />
      <meshStandardMaterial color={color} />
    </instancedMesh>
  )
);

export default CubeInstancedMesh;