import { Environment } from '@react-three/drei';
import { useControls } from 'leva';
import {
  AxesHelper,
  CubeInstances,
  GridHelper,
  GroundPlane,
} from '../Environment';
import { CUBE_POSITIONS } from '@/utils/constants';
import Elevator from '../Environment/Elevator';
import BallSpawner from '../Environment/BallSpawner';

export default function Level1() {
  const { useEnvironmentLightning } = useControls({
    useEnvironmentLightning: {
      value: false,
      label: 'use Environment Lightning',
    },
  });
  return (
    <>
      {/* Optionally add environment lighting based on leva control */}
      {useEnvironmentLightning ? <Environment preset="sunset" /> : ''}
      {/* Ground plane for the scene */}
      <GroundPlane />
      {/* Axes and grid helpers for orientation */}
      <AxesHelper size={5} />
      <GridHelper size={100} divisions={100} />
      {/* Render cubes at predefined positions */}
      <CubeInstances positions={CUBE_POSITIONS} />
      {/* Two elevators with different positions, sizes, heights, speeds, and colors */}
      <Elevator
      position={[0, 0.1, 5]}
      size={[2, 0.2, 2]}
      height={5}
      speed={1}
      color="#ff0"
      />
      <Elevator
      position={[5, 0.1, 0]}
      size={[3, 0.2, 3]}
      height={8}
      speed={2}
      color="#0ff"
      />
      {/* Spawns balls in the scene */}
      <BallSpawner />
    </>
  );
}
