import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useCharacterStore } from './Hooks/useCharacterStore';
import { useCharacterAnimation } from '../Animations/hooks/useCharacterAnimation';
import { willCollide } from '@/utils/helperFunctions';
import {
  GRAVITY,
  GROUND_Y,
  JUMP_STRENGTH,
  MOVE_SPEED,
  RUN_SPEED,
} from '@/utils/constants';

type CharacterProps = {
};

//TODO: Kollisionen über Animation based Character ist umständlich.. Character auf Physics umstellen
export default function AnimationBasedCharacter({  }: CharacterProps) {
  const setIsMoving = useCharacterStore((s) => s.setIsMoving);
  const characterRef = useRef<THREE.Group>(null!);
  const velocityY = useRef(0);
  const onGround = characterRef.current
    ? characterRef.current.position.y <= GROUND_Y + 0.01
    : true;

  const isJumping = useRef(false);
  const { scene, animations } = useGLTF('/models/Soldier2.glb');
  const { actions } = useAnimations(animations, characterRef);
  const animation = useCharacterAnimation(
    characterRef,
    actions,
    setIsMoving,
    onGround, // boolean, z.B. group.current.position.y <= GROUND_Y + 0.01
    velocityY.current // aktuelle Y-Geschwindigkeit
  );
  const [, getKeys] = useKeyboardControls();

  // Aktuellen Animationsstatus loggen
  useFrame((state, delta) => {
    console.log(animation.currentAction);
    if (!characterRef.current || !actions) return;

    const keys = getKeys();

    // SPRINGEN & SCHWERKRAFT
    const onGround = characterRef.current.position.y <= GROUND_Y + 0.01;
    animation.update(keys, delta, onGround, velocityY.current);
    if (keys.jump && onGround && !isJumping.current) {
      velocityY.current = JUMP_STRENGTH;
      isJumping.current = true;
    }
    if (!onGround || velocityY.current > 0) {
      velocityY.current += GRAVITY * delta;
      characterRef.current.position.y += velocityY.current * delta;
      if (characterRef.current.position.y <= GROUND_Y) {
        characterRef.current.position.y = GROUND_Y;
        velocityY.current = 0;
        isJumping.current = false;
      }
    }

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
    const nextPos = characterRef.current.position.clone().add(moveVec);

    // Nur bewegen, wenn keine Kollision mit Cubes (Y bleibt erhalten)
    nextPos.y = characterRef.current.position.y;
    if (!willCollide(nextPos)) {
      characterRef.current.position.copy(nextPos);
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
      characterRef.current.quaternion.slerp(targetQuat, 0.2);
    }

    const charPos = characterRef.current.position.clone();
    const cam = state.camera;
    const directionPressed =
      keys.forward || keys.backward || keys.left || keys.right;
    if (directionPressed) {
      const camOffset = new THREE.Vector3(0, 5, 10).applyQuaternion(
        characterRef.current.quaternion
      );
      const desiredPos = charPos.clone().add(camOffset);
      cam.position.lerp(desiredPos, 0.1);
    }
    cam.lookAt(charPos);
  });

  return (
    <primitive position={[0, 0, 0]} ref={characterRef} object={scene} castShadow />
  );
}
