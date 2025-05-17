'use client';

import { useFrame, useThree } from "@react-three/fiber";

type CameraFollowerProps = {
  target: [number, number, number];
};

export default function CameraFollower({ target }: CameraFollowerProps) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = target[0];
    camera.position.y = target[1] + 1;
    camera.position.z = target[2] + 3;
    camera.lookAt(target[0], target[1], target[2]);
  });
  return null;
}