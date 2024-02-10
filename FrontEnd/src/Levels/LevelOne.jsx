import React, { useEffect, useState } from "react";
import { Floor } from "../Components/Floor";
import Player from "../Components/player";

import { playersAtom } from "../Atoms";
import { useAtom } from "jotai";
const LevelOne = () => {
  const [players] = useAtom(playersAtom)
  let xLength = 1;
  let zLength = 1;
  let space = 1;
  let floorMap = Array.from({ length: xLength }, (_, rowIndex) =>
    Array.from({ length: zLength }, (_, colIndex) => ({
      position: { x: colIndex - (xLength - space) / 2, y: 0, z: rowIndex - (zLength - space) / 2 },
      direction: colIndex % 2 === 0 ? "left" : "right",
      type: "plain",
      id: colIndex.toString() + rowIndex.toString(),
    }))
  ).flat();
  return (
    <>
      {
        players && Object.values(players).map(({playerId,color, position}) => (
          <Player color={color} position={position} playerId={playerId} key={playerId}/>
        ))
      }
      {floorMap.map((props, index) => (
        <Floor {...props} key={props.id} />
      ))}
    </>
  );
};

export default LevelOne;
