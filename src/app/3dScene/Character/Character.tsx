import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useCharacterStore } from './Hooks/useCharacterStore';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useCharacterAnimation } from '../Animations/hooks/useCharacterAnimation';

export default function Character() {
  const group = useRef<THREE.Group>(null!);
  const setIsMoving = useCharacterStore((s) => s.setIsMoving);

  const { scene, animations } = useGLTF('/Soldier.glb');
  const { actions } = useAnimations(animations, group);
  const animation = useCharacterAnimation(group, actions, setIsMoving);
  const [, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!group.current || !actions) return;

    const keys = getKeys();
    animation.update(keys, delta);

    // MOVEMENT DIRECTION RELATIVE TO CAMERA
    const moveDir = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    state.camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();
    const camRight = new THREE.Vector3()
      .crossVectors(camDir, new THREE.Vector3(0, 1, 0))
      .normalize();

    if (keys.forward) moveDir.add(camDir);
    if (keys.backward) moveDir.sub(camDir);
    if (keys.left) moveDir.sub(camRight);
    if (keys.right) moveDir.add(camRight);

    moveDir.normalize();

    const moveSpeed = keys.run ? 5 : 2;
    group.current.position.add(
      moveDir.clone().multiplyScalar(moveSpeed * delta)
    );

    // ROTATE CHARACTER TO MOVE DIRECTION
    if (moveDir.lengthSq() > 0) {
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(
          new THREE.Vector3(0, 0, 0),
          moveDir,
          new THREE.Vector3(0, 1, 0)
        )
      );
      group.current.quaternion.slerp(targetQuat, 0.2);
    }

    const charPos = group.current.position.clone();
    const cam = state.camera;
    const directionPressed =
      keys.forward || keys.backward || keys.left || keys.right;
    if (directionPressed) {
      const camOffset = new THREE.Vector3(0, 5, 10).applyQuaternion(
        group.current.quaternion
      );
      const desiredPos = charPos.clone().add(camOffset);
      cam.position.lerp(desiredPos, 0.1);
    }
    cam.lookAt(charPos);
  });

  return (
    <RigidBody
      colliders={false}
      position={[0, 1.6, 0]}
      mass={1}
      enabledRotations={[false, true, false]}
    >
      {/* Debug capsule */}

      <primitive position={[0, 0, 0]} ref={group} object={scene} castShadow>
        <mesh position={[0, 1, 0]}>
          <capsuleGeometry args={[0.3, 1.5]} />
          <meshBasicMaterial color="red" transparent opacity={0.4} wireframe />
        </mesh>
        <CapsuleCollider args={[0.3, 1.5]} position={[0, 1.8, 0]} />
      </primitive>
    </RigidBody>
  );
}
