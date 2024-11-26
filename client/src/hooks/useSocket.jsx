import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  resetScores,
} from "../features/games/gameSlice";
import { toast } from "react-toastify";

const useSocket = (socket, setWaitingForOpponent) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const resetGameState = () => {
      setWaitingForOpponent(true);
      dispatch(resetScores());
      
    };

    socket.on("roomAssigned", ({ roomId }) => {
      dispatch(resetScores());
      dispatch(setRoomName(roomId));
      setWaitingForOpponent(true);
    });

    socket.on("startGame", () => {
      setWaitingForOpponent(false);
    });

    socket.on("waitingForOpponent", () => {
      setWaitingForOpponent(true);
    });

    socket.on("playerLeft", () => {
      toast.info("Opponent left The Game");
      resetGameState();
    });

    socket.on("roomNotFound", () => {
      toast.error("Room does not exist.");
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
    });

    socket.on("roomFull", () => {
      toast.error("The room is full.");
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
    });

    return () => {
      socket.off("roomAssigned");
      socket.off("startGame");
      socket.off("waitingForOpponent");
      socket.off("playerLeft");
      socket.off("roomNotFound");
      socket.off("roomFull");
    };
  }, [socket, setWaitingForOpponent, dispatch]);
};

export default useSocket;
