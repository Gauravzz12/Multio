import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  resetScores,
  setMatchInfo,
  resetMatchInfo,
} from "../features/games/gameSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSocket = (socket, setWaitingForOpponent, setGameOver) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;
    socket.on("roomAssigned", ({ roomId }) => {
      dispatch(resetScores());
      dispatch(setRoomName(roomId));
      setWaitingForOpponent(true);
    });

    socket.on('gameOver', (data) => {
      setGameOver(true);
      dispatch(setMatchInfo({winner: data.winnerID, loser: data.loserID}));
      setTimeout(() => {
        navigate('/Games');
        dispatch(resetMatchInfo());
      }, 3000);
    })
    socket.on("waitingForOpponent", () => {
      setWaitingForOpponent(true);
    });

    socket.on("playerLeft", () => {
      toast.info("Opponent left The Game");
      setWaitingForOpponent(true);
      dispatch(resetScores());
      dispatch(setMatchInfo({ rounds: null, winner: null, loser: null, playersInfo: null }));
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
