import React, { useEffect, useState } from "react";
import { Floor } from "../Components/Floor";
import Player from "../Components/player";

const LevelOne = () => {
  const [ready, setReady] = useState(false);
  let xLength = 10;
  let zLength = 10;
  let space = 1;
  let floorMap = Array.from({ length: xLength }, (_, rowIndex) =>
    Array.from({ length: zLength }, (_, colIndex) => ({
      position: { x: colIndex - (xLength - space) / 2, y: 0, z: rowIndex - (zLength - space) / 2 },
      direction: colIndex % 2 === 0 ? "left" : "right",
      type: "plain",
      id: colIndex.toString() + rowIndex.toString(),
    }))
  ).flat();
  useEffect(() => {
    setTimeout(() => setReady(true), 2000);
  }, []);
  return (
    <>
      {ready && <Player color='blue' args={[1, 1, 1]} position={[0, 1, 0]} />}
      {ready && <Player color='red' args={[1, 1, 1]} position={[-2, 1, 0]} />}
      {floorMap.map((props, index) => (
        <Floor {...props} key={props.id} />
      ))}
    </>
  );
};

export default LevelOne;
