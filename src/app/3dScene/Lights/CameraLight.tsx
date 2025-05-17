'use client';

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { DirectionalLight, Vector3 } from "three";

export default function CameraLight() {
    const lightRef = useRef<DirectionalLight>(null);
    const { camera } = useThree();

    useFrame(() => {
      if (lightRef.current) {
        // Positioniere das Licht immer etwas hinter der Kamera
        lightRef.current.position.copy(camera.position);
        // Optional: Zeige in Blickrichtung der Kamera
        lightRef.current.target.position.copy(
          camera.position
            .clone()
            .add(camera.getWorldDirection(new Vector3()))
        );
        lightRef.current.target.updateMatrixWorld();
      }
    });

    return (
      <>
        <directionalLight
          ref={lightRef}
          intensity={1.2}
          color="white"
          castShadow={false}
        />
        {/* Target muss als Objekt in der Szene sein */}
        <object3D />
      </>
    );
  }
