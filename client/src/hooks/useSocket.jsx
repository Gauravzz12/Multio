import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGameMode,
  setResult,
  setRoomName,
  setOpponentChoice,
  resetGame,
} from "../features/games/rpsSlice";
import { toast } from "react-toastify";

const useSocket = (socket, setGameStarted, setWaitingForOpponent, setUserChoice) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const resetGameState = () => {
      setGameStarted(false);
      setUserChoice(null);
      setWaitingForOpponent(true);
      dispatch(resetGame());
      dispatch(setOpponentChoice(null));
      dispatch(setResult(null));
    };

    socket.on("roomAssigned", ({ roomId }) => {
      dispatch(setRoomName(roomId));
      setWaitingForOpponent(true);
    });

    socket.on("startGame", () => {
      setGameStarted(true);
      setWaitingForOpponent(false);
      setUserChoice(null);
      dispatch(setOpponentChoice(null));
      dispatch(setResult(null));
    });

    socket.on("waitingForOpponent", () => {
      setWaitingForOpponent(true);
      setGameStarted(false);
    });

    socket.on("gameResult", (data) => {
      dispatch(setResult(data.result));
      dispatch(setOpponentChoice(data.opponentChoice));
      setWaitingForOpponent(false);
    });

    socket.on("waitingForPlayer", () => {
      setGameStarted(false);
      setWaitingForOpponent(true);
    });

    socket.on("playerLeft", resetGameState);

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
      socket.off("gameResult");
      socket.off("waitingForPlayer");
      socket.off("playerLeft");
      socket.off("roomNotFound");
      socket.off("roomFull");
    };
  }, [socket, dispatch, setGameStarted, setWaitingForOpponent, setUserChoice]);
};

export default useSocket;
