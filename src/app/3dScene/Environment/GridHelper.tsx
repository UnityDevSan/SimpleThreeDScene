import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type GridHelperProps = {
    size?: number;
    divisions?: number;
    position?: [number, number, number];
};

// GridHelper-Komponente fügt dem Three.js-Scene-Graph ein GridHelper-Objekt hinzu
export default function GridHelper({ size = 100, divisions = 100, position = [0, 0.01, 0] }: GridHelperProps) {
    // Zugriff auf die aktuelle Three.js-Szene
    const { scene } = useThree();
    const helper = useRef<THREE.GridHelper | null>(null);

    useEffect(() => {
        // Erstelle und konfiguriere das GridHelper-Objekt
        helper.current = new THREE.GridHelper(size, divisions);
        helper.current.position.set(...position);
        scene.add(helper.current);
        // Entferne das GridHelper-Objekt beim Unmount oder wenn sich die Abhängigkeiten ändern
        return () => {
            if (helper.current) scene.remove(helper.current);
        };
    }, [scene, size, divisions, position]);

    // Diese Komponente rendert kein eigenes JSX
    return null;
}