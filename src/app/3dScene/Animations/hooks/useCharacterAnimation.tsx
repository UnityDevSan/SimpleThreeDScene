import { CHARACTER_STATE } from '@/utils/enums';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function useCharacterAnimation(
  group: React.RefObject<THREE.Group>,
  actions: any,
  setIsMoving: (b: boolean) => void,
  onGround?: boolean,
  velocityY?: number
) {
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const currentAction = useRef<string>(CHARACTER_STATE.IDLE);
  const wasMoving = useRef(false);

  useEffect(() => {
    if (!group.current) return;
    mixer.current = new THREE.AnimationMixer(group.current);
  }, [group]);

  function update(
    keys: any,
    delta: number,
    onGround?: boolean,
    velocityY?: number
  ) {
    if (!mixer.current || !actions) return;

    const directionPressed =
      keys.forward || keys.backward || keys.left || keys.right;
    const isRunning = keys.run;

    let nextAction = CHARACTER_STATE.IDLE;

    // Jump/Fall Animationen, falls vorhanden und Argumente übergeben
    if (typeof onGround === 'boolean' && typeof velocityY === 'number') {
      if (!onGround && velocityY > 0 && actions[CHARACTER_STATE.JUMP]) {
        nextAction = CHARACTER_STATE.JUMP;
      } else if (!onGround && velocityY < 0 && actions[CHARACTER_STATE.FALL]) {
        nextAction = CHARACTER_STATE.FALL;
      } else if (directionPressed) {
        nextAction = isRunning ? CHARACTER_STATE.RUN : CHARACTER_STATE.WALK;
      }
    } else {
      if (directionPressed)
        nextAction = isRunning ? CHARACTER_STATE.RUN : CHARACTER_STATE.WALK;
    }

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
  }

  return { update, currentAction: currentAction.current };
}
