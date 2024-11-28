import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
} from "../../features/games/gameSlice"; 
import rockIcon from "../../assets/images/RPS/rock.svg";
import paperIcon from "../../assets/images/RPS/paper.svg";
import scissorsIcon from "../../assets/images/RPS/scissors.svg";
import GameModeSelector from "../GameModeSelector";
import GameDisplay from "../GameDisplay";
import RoomManager from "../RoomManager";
import OpponentLoader from "../OpponentLoader";
import { FaCopy } from "react-icons/fa";
import useSocket from "../../hooks/useSocket";
import { selectCurrentUser } from "../../features/auth/authSlice"; 
import ScoreBoard from "../ScoreBoard";

const RPS = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, scores } = useSelector((state) => state.game);
  const [socket, setSocket] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/rps"
        : "https://multio-backend.up.railway.app/rps"
    );
    setSocket(newSocket);

    newSocket.on("startGame", (data) => {
      setWaitingForOpponent(false);
      setUserChoice(null);
      setOpponentChoice(null); 
      setResult(null);
      dispatch(setScores(data.scores));
    });

    newSocket.on("gameResult", (data) => {
      setResult(data.result);
      setOpponentChoice(data.opponentChoice); 
      dispatch(setScores(data.scores));
      setWaitingForOpponent(false);
    });

  

    newSocket.on("scoresReset", () => {
      dispatch(resetScores());
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      setUserChoice(null);
      setWaitingForOpponent(false);
      newSocket.off("startGame");
      newSocket.off("gameResult");
      newSocket.off("startNextRound");
      newSocket.off("scoresReset");
    };
  }, []);

  useSocket(socket, setWaitingForOpponent);

  useEffect(() => {
    if (socket && gameMode === "online" && !roomName) {
      socket.emit("joinRoom", {});
    } else if (socket && gameMode === "friends" && roomName) {
      socket.emit("joinRoom", { roomId: roomName });
    }
  }, [socket, gameMode, roomName]);

  const handleChoice = (choice) => {
    setUserChoice(choice);
    socket.emit("makeChoice", { roomId: roomName, choice });
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomName);
  };

  const ChoiceButtons = () => {
    if (!roomName) return;
    const choices = [
      { name: "Rock", icon: rockIcon },
      { name: "Paper", icon: paperIcon },
      { name: "Scissors", icon: scissorsIcon },
    ];
    const choiceIcons = {
      Rock: rockIcon,
      Paper: paperIcon,
      Scissors: scissorsIcon,
    };

    return (
      <div className="flex flex-col items-center justify-center h-72">
        {userChoice ? (
          <div>
            <h2 className="text-2xl md:text-3xl">You chose:</h2>
            <img
              src={choiceIcons[userChoice]}
              alt={userChoice}
              className="w-16 h-16 md:w-24 md:h-24 mx-auto"
            />
            <p className="text-xl md:text-2xl mt-2">{userChoice}</p>
            <h2 className="text-2xl md:text-3xl mt-4">Waiting for opponent's choice...</h2>
          </div>
        ) : (
          <div className="flex gap-4 md:gap-10 justify-center items-center h-full">
            {choices.map((choice) => (
              <button
                key={choice.name}
                className="bg-amber-500 rounded-md p-2 border-4 transform hover:scale-105 transition duration-300 w-16 h-16 md:w-24 md:h-24"
                onClick={() => handleChoice(choice.name)}
              >
                <img
                  src={choice.icon}
                  alt={choice.name}
                  className="w-8 h-8 md:w-12 md:h-12 mx-auto"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-center text-white relative px-4 md:px-8">
      <h2 className="text-white text-4xl md:text-5xl mb-4 font-bold tracking-wider flex justify-center">
        Rock Paper Scissors
      </h2>
      {gameMode === "friends" && roomName && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800 p-2 rounded">
          <button onClick={copyRoomId}>
            <p className="flex items-center">
              Copy Room Id
              <FaCopy className="text-xl hover:text-gray-300 ml-1" />
            </p>
          </button>
        </div>
      )}
      {roomName ? <ScoreBoard socketId={socket?.id} /> : ""}

      {!gameMode ? (
        <GameModeSelector />
      ) : gameMode === "friends" && !roomName ? (
        <RoomManager />
      ) : waitingForOpponent ? (
        <OpponentLoader />
      ) : userChoice && opponentChoice && result ? (
        <GameDisplay
          userChoice={userChoice}
          opponentChoice={opponentChoice}
          result={result}
        />
      ) : (
        <ChoiceButtons />
      )}
    </div>
  );
};

export default RPS;
