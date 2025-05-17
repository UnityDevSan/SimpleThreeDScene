'use client';

import { Quaternion } from "three";
import { useFrame, useThree } from "@react-three/fiber";

export default function CameraSyncer({ onChange }: { onChange: (q: Quaternion) => void }) {
  const { camera } = useThree();
  useFrame(() => {
    onChange(camera.quaternion.clone());
  });
  return null;
}