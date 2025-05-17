// Character/Character.tsx
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useCharacterStore } from './Hooks/useCharacterStore';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';

export default function Character() {
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const currentAction = useRef<string>('Idle');

  const setIsMoving = useCharacterStore((s) => s.setIsMoving);
  const wasMoving = useRef(false);

  const { scene, animations } = useGLTF('/Soldier.glb');
  const { actions } = useAnimations(animations, group);

  const [, getKeys] = useKeyboardControls();

  useEffect(() => {
    if (!group.current) return;
    mixer.current = new THREE.AnimationMixer(group.current);
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !mixer.current || !actions) return;

    const keys = getKeys();
    const directionPressed =
      keys.forward || keys.backward || keys.left || keys.right;
    const isRunning = keys.run;

    let nextAction = 'Idle';
    if (directionPressed) nextAction = isRunning ? 'Run' : 'Walk';
    // Setze den Zustand nur, wenn er sich ändert
    if (wasMoving.current !== directionPressed) {
      setIsMoving(directionPressed);
      wasMoving.current = directionPressed;
    }
    if (currentAction.current !== nextAction) {
      const prevAction = actions[currentAction.current];
      const newAction = actions[nextAction];
      prevAction?.fadeOut(0.2);
      newAction?.reset().fadeIn(0.2).play();
      currentAction.current = nextAction;
    }

    mixer.current.update(delta);

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

    const moveSpeed = currentAction.current === 'Run' ? 5 : 2;
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
    if (directionPressed) {
      // Nur wenn bewegt: Position folgt Character
      const camOffset = new THREE.Vector3(0, 5, 10).applyQuaternion(
        group.current.quaternion
      );
      const desiredPos = charPos.clone().add(camOffset);
      cam.position.lerp(desiredPos, 0.1);
    }
    // Immer: Kamera schaut zum Character
    cam.lookAt(charPos);
  });
  return (
    <RigidBody
      colliders={false}
      position={[0, 1.6, 0]}
      mass={1}
      enabledRotations={[false, true, false]}
    >
      <CapsuleCollider args={[0.3, 1.5]} position={[0, 1.8, 0]} />

      {/* Debug capsule */}
      {/* <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.3, 1.5]} />
        <meshBasicMaterial color="red" transparent opacity={0.4} wireframe />
      </mesh> */}

      <primitive position={[0, 0, 0]} ref={group} object={scene} castShadow />
    </RigidBody>
  );
}
