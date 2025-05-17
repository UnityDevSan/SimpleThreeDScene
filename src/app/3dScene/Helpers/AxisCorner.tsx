'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function RotatingAxes({ cameraQuat }: { cameraQuat: THREE.Quaternion }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.quaternion.copy(cameraQuat);
    }
  });

  return (
    <group ref={groupRef}>
      <axesHelper args={[2]} />
    </group>
  );
}

export default function AxisCorner({ cameraQuat }: { cameraQuat: THREE.Quaternion }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 16,
        top: 16,
        width: 80,
        height: 80,
        pointerEvents: "none",
        zIndex: 20,
        background: "rgba(0,0,0,0.2)",
        borderRadius: 8,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight />
        <RotatingAxes cameraQuat={cameraQuat} />
      </Canvas>
    </div>
  );
}