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
