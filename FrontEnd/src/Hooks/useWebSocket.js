import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { playersAtom, currentPlayerIdAtom } from "../Atoms"; 
export const websocketAtom = atom(null);

const useWebSocket = url => {
  const [websocket, setWebSocket] = useState(null);
  const setWsAtom = useSetAtom(websocketAtom);
  const setPlayersAtom = useSetAtom(playersAtom)
  const setCurrentPlayerId = useSetAtom(currentPlayerIdAtom)
  const [readyState, setReadyState] = useState(null)
  useEffect(() => {
    const socket = new WebSocket(url);
    console.log(socket)
    setReadyState[socket.readyState]
      console.log(socket)
      setWebSocket(socket);
      setWsAtom(socket);
      socket.addEventListener('message', event => {
        console.log('get initial data', JSON.parse(event.data))
        setPlayersAtom(JSON.parse(event.data).players)
        setCurrentPlayerId(JSON.parse(event.data).currentPlayerId)
      })
      socket.addEventListener('close', () => {
        console.log('disconnected')
        socket.close()
        console.log(socket)
      })
    return () => {
      socket.removeEventListener('message', () => {
        console.log('removed')
      })
      socket.close();
      console.log(socket)
    };
  }, [url, setWsAtom,readyState]);

  return websocket;
};

export default useWebSocket;
