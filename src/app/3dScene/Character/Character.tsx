import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useCharacterStore } from './Hooks/useCharacterStore';
import { useCharacterAnimation } from '../Animations/hooks/useCharacterAnimation';
import { willCollide } from '@/utils/helperFunctions';
import { MOVE_SPEED, RUN_SPEED } from '@/utils/constants';

//TODO: Kollisionen über Animation based Character ist umständlich.. Character auf Physics umstellen
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

    const moveSpeed = keys.run ? RUN_SPEED : MOVE_SPEED;
    const moveVec = moveDir.clone().multiplyScalar(moveSpeed * delta);
    const nextPos = group.current.position.clone().add(moveVec);

    // Nur bewegen, wenn keine Kollision mit Cubes
    if (!willCollide(nextPos)) {
      group.current.position.copy(nextPos);
    }

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
    <primitive position={[0, 0, 0]} ref={group} object={scene} castShadow />
  );
}

