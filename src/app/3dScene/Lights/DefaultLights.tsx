export default function DefaultLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Optional: <CameraLight /> */}
    </>
  );
}