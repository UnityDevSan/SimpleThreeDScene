import { create } from 'zustand';

type CharacterState = {
  isMoving: boolean;
  setIsMoving: (moving: boolean) => void;
};

export const useCharacterStore = create<CharacterState>((set) => ({
  isMoving: false,
  setIsMoving: (moving) => set({ isMoving: moving }),
}));