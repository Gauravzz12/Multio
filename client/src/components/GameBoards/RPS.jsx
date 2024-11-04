import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setResult,
  setRoomName,
  setOpponentChoice,
} from "../../features/games/rpsSlice";
import rockIcon from "../../assets/images/RPS/rock.svg";
import paperIcon from "../../assets/images/RPS/paper.svg";
import scissorsIcon from "../../assets/images/RPS/scissors.svg";
import GameModeSelector from "../GameModeSelector";
import GameDisplay from "../GameDisplay";
import RoomManager from "../RoomManager";
import OpponentLoader from "../OpponentLoader";

const RPS = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, result, opponentChoice } = useSelector((state) => state.rps);
  const [socket, setSocket] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("startGame", () => {
      setGameStarted(true);
    });

    newSocket.on("gameResult", (data) => {
      dispatch(setResult(data.result));
      dispatch(setOpponentChoice(data.opponentChoice));
    });

    newSocket.on("playerLeft", () => {
      // Handle opponent leaving
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      setUserChoice(null);
      setGameStarted(false);
    };
  }, [dispatch]);

  useEffect(() => {
    if (socket && gameMode) {
      let roomId = roomName;
      if (gameMode === "online") {
        roomId = "RPS_AutoRoom";
      }
      socket.emit("joinRoom", { game: "RPS", roomId });
    }
  }, [socket, gameMode, roomName]);

  const handleChoice = (choice) => {
    setUserChoice(choice);
    socket.emit("makeChoice", { roomId: roomName || "RPS_AutoRoom", choice });
  };

  const ChoiceButtons = () => {
    const choices = [
      { name: "Rock", icon: rockIcon },
      { name: "Paper", icon: paperIcon },
      { name: "Scissors", icon: scissorsIcon },
    ];

    return (
      <div className="flex gap-10 justify-center items-center h-[95%]">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className="bg-amber-500 rounded-md p-2 border-4"
            onClick={() => handleChoice(choice.name)}
          >
            <img src={choice.icon} alt={choice.name} className="w-12 h-12" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-center text-white">
      {!gameMode ? (
        <GameModeSelector />
      ) : gameMode === "friends" && !roomName ? (
        <RoomManager socket={socket} />
      ) : !gameStarted ? (
        <OpponentLoader />
      ) : userChoice && result ? (
        <GameDisplay userChoice={userChoice} opponentChoice={opponentChoice} result={result} />
      ) : (
        <ChoiceButtons />
      )}
    </div>
  );
};

export default RPS;
