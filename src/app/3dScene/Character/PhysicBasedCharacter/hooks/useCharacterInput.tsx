import { useRef, useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';

export function useCharacterInput() {
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);
  const isJumping = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchDelta = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseDown = () => {
      isClicking.current = true;
    };
    const onMouseUp = () => {
      isClicking.current = false;
    };
    const onTouchStart = (e: TouchEvent) => {
      isClicking.current = true;
      if (e.touches.length > 0) {
        touchStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStart.current && e.touches.length > 0) {
        touchDelta.current = {
          x: (e.touches[0].clientX - touchStart.current.x) / window.innerWidth,
          y: (e.touches[0].clientY - touchStart.current.y) / window.innerHeight,
        };
      }
    };
    const onTouchEnd = () => {
      isClicking.current = false;
      touchStart.current = null;
      touchDelta.current = { x: 0, y: 0 };
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return {
    getKeyboard: get,
    isClicking,
    isJumping,
    touchStart,
    touchDelta,
  };
}