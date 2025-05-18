import { useControls } from "leva";

export default function DefaultLights() {
    const { useDefaultLight } = useControls({
        useDefaultLight: {
            value: true,
            label: 'use DefaultLight',
        },
    });
    
    return (
        useDefaultLight ? (
            <>
                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[5, 10, 5]}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
            </>
        ) : null
    );
}