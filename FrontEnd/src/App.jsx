import {
  ContactShadows,
  Environment,
  GizmoHelper,
  Grid,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Sky,
  Stars,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, useEffect } from "react";
import { NavigationControls } from "./Components/KeyboardsControls";
import useWebSocket, {websocketAtom} from "./Hooks/useWebSocket";
import { LevelOne } from "./Levels";
const Experience = () => {
  return (
    <>
      <Sky sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <GizmoHelper />
      <Stars />
      <OrbitControls />
      <ambientLight />
      <axesHelper args={[5]} />
      <PerspectiveCamera position={[0, 100, 100]} lookAt={[0, -10, 0]} />
      <LevelOne />
      <Environment preset='city' />
      <ContactShadows frames={1} position={[0, -0.5, 0]} scale={10} opacity={0.4} far={1} blur={2} />
      <Grid args={[10, 10, 10]} />
    </>
  );
};

const App = () => {
  useWebSocket("ws://localhost:3000/");
  return (
    <NavigationControls>
      <Canvas
        camera={{
          position: [0, 5, 10],
          type: OrthographicCamera,
        }}
      >
        <Suspense >
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </NavigationControls>
  );
};

export default App;
