import { Box, Edges } from "@react-three/drei";
import { RigidBody, vec3 } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";
export const Floor = ({ position, type, player, id }) => {
  let color = type === "plain" ? "springGreen" : player === "Red" ? "red" : "blue";
  const rigidBodyRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      rigidBodyRef.current.setNextKinematicTranslation(
        vec3({
          ...position,
        }),
        true
      );
    }, 1000);
  }, []);
  return (
    <RigidBody ref={rigidBodyRef} type={"kinematicPosition"}>
      <Box args={[10, 1, 10]} castShadow receiveShadow>
        {/* <axesHelper /> */}
        <meshPhysicalMaterial color={color} />
        <Edges color={color} />
      </Box>
    </RigidBody>
  );
};
