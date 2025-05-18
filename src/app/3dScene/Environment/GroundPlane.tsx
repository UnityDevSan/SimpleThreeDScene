/**
 * GroundPlane component creates a large static ground surface for a 3D scene.
 *
 * - Uses a fixed RigidBody from @react-three/rapier to make the ground immovable.
 * - The visual ground is a 100x100 plane mesh, rotated to lie flat (XZ plane), and receives shadows.
 * - A CuboidCollider is added to provide collision detection for physics interactions,
 *   matching the size of the plane (100x100 units, very thin height).
 *
 * @returns {JSX.Element} The ground plane with physics collider for use in a 3D scene.
 */
import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function GroundPlane() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={'#777'} />
      </mesh>
      <CuboidCollider args={[50, 0.01, 50]} position={[0, 0, 0]} />
    </RigidBody>
  );
}
