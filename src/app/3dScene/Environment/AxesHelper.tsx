/**
 * React-Komponente, die einen THREE.AxesHelper zur Visualisierung der Achsen im 3D-Szenenraum hinzufügt.
 * Die Größe und Position des Helpers können über Props angepasst werden.
 * Wird beim Mounten zur Szene hinzugefügt und beim Unmounten entfernt.
 */
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type AxesHelperProps = {
    size?: number;
    position?: THREE.Vector3;
};

export default function AxesHelper({ size = 5, position = new THREE.Vector3(0, 0.1, 0) }: AxesHelperProps) {
    const { scene } = useThree();
    const helper = useRef<THREE.AxesHelper>(null);

    useEffect(() => {
        helper.current = new THREE.AxesHelper(size);
        helper.current.position.copy(position);
        scene.add(helper.current);
        return () => {
            if (helper.current) scene.remove(helper.current);
        };
    }, [scene, size, position]);

    return null;
}