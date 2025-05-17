// store/useKeyboardStore.ts
import { create } from 'zustand';
import { KeyboardControlsEntry } from '@react-three/drei';

interface ControlsState {
  keys: Record<string, boolean>
  setKeys: (entry: KeyboardControlsEntry[]) => void
}

export const useKeyboardStore = create<ControlsState>((set) => ({
  keys: {},
  setKeys: (entries) => {
    const keyMap: Record<string, boolean> = {}
    entries.forEach((entry) => {
      keyMap[entry.name] = false // or true, or your desired default state
    })
    set({ keys: keyMap })
  },
}))

// optional HOC for clean context usage
export const ControlsProvider = ({ children }: { children: React.ReactNode }) => {
  return children
}
