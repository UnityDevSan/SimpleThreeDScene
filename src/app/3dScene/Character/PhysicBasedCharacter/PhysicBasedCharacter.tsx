import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  CapsuleCollider,
  RigidBody,
  RapierRigidBody,
} from '@react-three/rapier';
import { useRef, useEffect, useState } from 'react';
import { MathUtils, Vector3, Group } from 'three';
import { MOVE_SPEED, ROTATION_SPEED, RUN_SPEED } from '@/utils/constants';
import { CHARACTER_STATE } from '@/utils/enums';
import { useControls } from 'leva';
import { CharacterRenderer } from './CharacterRenderer';

const JUMP_STRENGTH = 6; // Passe ggf. an

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const PhysicBasedCharacter = () => {
  // Refs
  const rb = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const cameraWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAt = useRef<Vector3>(new Vector3());
  
  const { enableMouseMovement } = useControls({
    enableMouseMovement: { value: false, label: 'Mouse Movement aktiv' },
  });
  // State
  const [animation, setAnimation] = useState<CHARACTER_STATE>(
    CHARACTER_STATE.IDLE
  );
  // Movement/Rotation
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);

  // Keyboard
  const [, get] = useKeyboardControls();

  // Mouse/Touch
  const isClicking = useRef(false);
  // Sprung-Status
  const isJumping = useRef(false);

  useEffect(() => {
    const onMouseDown = () => {
      isClicking.current = true;
    };
    const onMouseUp = () => {
      isClicking.current = false;
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchstart', onMouseDown);
    document.addEventListener('touchend', onMouseUp);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchstart', onMouseDown);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      const vel = rb.current.linvel();

      // Movement input
      const movement = { x: 0, z: 0 };

      if (get().forward) movement.z = 1;
      if (get().backward) movement.z = -1;
      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;

      let speed = get().run ? RUN_SPEED : MOVE_SPEED;

      // Mouse/touch input
      if (enableMouseMovement && isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) movement.x = -mouse.x;
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }

      // Rotation
      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      // Bewegung und Animation
      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        setAnimation(
          speed === RUN_SPEED ? CHARACTER_STATE.RUN : CHARACTER_STATE.WALK
        );
      } else {
        setAnimation(CHARACTER_STATE.IDLE);
      }

      // Charakter-Rotation smooth interpolieren
      if (character.current) {
        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          characterRotationTarget.current,
          0.1
        );
      }

      // --- SPRINGEN ---
      // --- SPRINGEN ---
      const onGround = Math.abs(vel.y) < 0.08;
      let nextVel = { ...vel };

      if (get().jump && onGround && !isJumping.current) {
        nextVel.y = JUMP_STRENGTH;
        isJumping.current = true;
      }
      if (onGround) isJumping.current = false;

      rb.current.setLinvel(nextVel, true);
    }

    // CAMERA
    if (container.current) {
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
    }

    if (cameraPosition.current) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);
    }

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });
  return (
    <RigidBody colliders={false} lockRotations ref={rb} position={[0, 2, 0]}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={2} position-z={-4} />
        <group rotation-y={Math.PI}>
          <CharacterRenderer
            ref={character}
            scale={1}
            position-y={-1}
            animation={animation}
          />
        </group>
      </group>
      <CapsuleCollider args={[0.85, 0.15]} />
    </RigidBody>
  );
};
