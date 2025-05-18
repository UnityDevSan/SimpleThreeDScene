// Einfache AABB-Kollisionsfunktion für non physic engine based collision detection

import { Vector3 } from 'three';
import { CUBE_POSITIONS, CUBE_SIZE,CHARACTER_SIZE } from './constants';

//Kein useCallback nötig da wir keine Props übergeben und die Funktion nicht in einem useEffect verwendet wird
export function willCollide(nextPos: Vector3) {
  for (const [x, y, z] of CUBE_POSITIONS) {
    if (
      Math.abs(nextPos.x - x) < CUBE_SIZE / 2 + CHARACTER_SIZE / 2 &&
      Math.abs(nextPos.z - z) < CUBE_SIZE / 2 + CHARACTER_SIZE / 2
    ) {
      return true;
    }
  }
  return false;
}
