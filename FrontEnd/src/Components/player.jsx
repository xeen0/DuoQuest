import { Box, Edges, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { websocketAtom } from "../Hooks/useWebSocket";
import { useAtom } from "jotai";
import { currentPlayerIdAtom, playersAtom } from "../Atoms";
const Player = ({ position, color,playerId }) => {
  const playerRef = useRef();
  const [, get] = useKeyboardControls();
  const moveImpulse = useMemo(() => new THREE.Vector3(), []);
  const moveAccNeeded = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  const currentVel = useMemo(() => new THREE.Vector3(), []);
  const [websocket] = useAtom(websocketAtom)
  const [players] = useAtom(playersAtom)
  const [currentPlayerId] = useAtom(currentPlayerIdAtom)
  const maxVelLimit = 2.5;
  const accDeltaTime = 8;
  useFrame((_, delta) => {
    if((playerId != currentPlayerId )) return
    if (playerRef.current) currentPos.copy(playerRef.current.translation());
    if (playerRef.current) currentVel.copy(playerRef.current.linvel());
    const { forward, backward, left, right } = get();
    const impulseDirection = { x: 0, y: 0, z: 0 };
    if (forward) {
      impulseDirection.z = -1;
      impulseDirection.x = 0;
    } else if (backward) {
      impulseDirection.z = 1;
      impulseDirection.x = 0;
    } else if (left) {
      impulseDirection.x = -1;
      impulseDirection.z = 0;
    } else if (right) {
      impulseDirection.x = 1;
      impulseDirection.z = 0;
    }
    
    if ( (playerId == currentPlayerId ) && (forward || backward || left || right)) {
      moveCharacter(impulseDirection);
    }
    if(currentPlayerId && (playerId === currentPlayerId )) {
      let {x,y,z} = playerRef.current.translation()
      updatePlayers(currentPlayerId, {
        ...players[currentPlayerId],
        position: [x,y,z]
      })
    }
    if(currentPlayerId && (playerId === currentPlayerId )) {
      let {x,y,z} = playerRef.current.translation()
      updatePlayers(currentPlayerId, {
        ...players[currentPlayerId],
        position: [x,y,z]
      }) 
    }
  } );
  const updatePlayers = (playerId, playerDetails) => {
    players[playerId] = playerDetails
    websocket.send(JSON.stringify({type: 'playerUpdate', players, currentPlayerId}))
  }
  const moveCharacter = impulseDirection => {
    moveAccNeeded.set(
      (impulseDirection.x * maxVelLimit - currentVel.x) / accDeltaTime,
      0,
      (impulseDirection.z * maxVelLimit - currentVel.z) / accDeltaTime
    );
    const moveForceNeeded = moveAccNeeded.multiplyScalar(playerRef.current.mass());
    moveImpulse.set(moveForceNeeded.x, 0, moveForceNeeded.z);
    playerRef.current.applyImpulse(
      moveImpulse,
      {
        x: currentPos.x,
        y: currentPos.y,
        z: currentPos.z,
      },
      true
    );
  };
  return (
    <RigidBody ref={playerRef} gravityScale={0.5} friction={1} position={position}>
      <CuboidCollider args={[1, 1, 1]} position={[0, 0, 0]} />
      <group name='Scene' scale={1}>
        <Box castShadow>
          <meshPhysicalMaterial color={color} />
          <Edges color={color} />
        </Box>
      </group>
    </RigidBody>
  );
};

export default Player;
