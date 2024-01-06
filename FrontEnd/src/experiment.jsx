import {  RigidBody, vec3 } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const Experiment = () => {
  let props = {
    position: [0, 0, 0],
  };
  const rigidBodyRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [springs, setSprings] = useSpring(() => ({
    color: "blue",
    position: [0, 0, 0],
  }));

  return (
    <group >
      <RigidBody
        type='fixed'
        ref={rigidBodyRef}
        onClick={() => {
          setClicked(!clicked);
          console.log(clicked, springs);
          console.log(rigidBodyRef.current.translation());
          rigidBodyRef.current.setTranslation(vec3({
            x:1,y:1,z:1
          }), true)
          // rigidBodyRef.current.position.set(1,1,1)
          // setSprings({
          //   color: clicked ? "red" : "blue",
          //   position: [1, 1, 1],
          // });
        }}
      >
        <animated.mesh position={springs.position}>
          <Box args={[1, 1, 1]}>
            <animated.meshStandardMaterial color={springs.color} />
          </Box>
        </animated.mesh>
      </RigidBody>
    </group>
  );
};

export default Experiment;
