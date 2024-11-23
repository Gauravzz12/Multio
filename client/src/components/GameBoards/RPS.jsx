import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  setResult,
  setOpponentChoice,
  setScores,
  resetScores,
} from "../../features/games/rpsSlice";
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

const RPS = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, result, opponentChoice } = useSelector(
    (state) => state.rps
  );
  const [socket, setSocket] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  console.log(import.meta.env.MODE === "development" ? "http://localhost:5000/rps" : "https://multio.netlify.app/rps")
  useEffect(() => {
    const newSocket = io(import.meta.env.MODE === "development" ? "http://localhost:5000/rps" : "https://multio.netlify.app/rps");
    setSocket(newSocket);

    newSocket.on("startGame", (data) => {
      setWaitingForOpponent(false);
      setUserChoice(null);
      dispatch(setOpponentChoice(null));
      dispatch(setResult(null));
      dispatch(setScores(data.scores));
    });

    newSocket.on("gameResult", (data) => {
      dispatch(setResult(data.result));
      dispatch(setOpponentChoice(data.opponentChoice));
      dispatch(setScores(data.scores));
      setWaitingForOpponent(false);
    });

    newSocket.on("startNextRound", (data) => {
      setUserChoice(null);
      dispatch(setOpponentChoice(null));
      dispatch(setResult(null));
      if (data.scores) {
        dispatch(setScores(data.scores));
      }
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

  useSocket(socket,setWaitingForOpponent);

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
      <div className="flex flex-col items-center justify-center  h-72">
        {userChoice ? (
          <div>
            <h2 className="text-2xl">You chose:</h2>
            <img
              src={choiceIcons[userChoice]}
              alt={userChoice}
              className="w-24 h-24"
            />
            <p className="text-xl mt-2">{userChoice}</p>
            <h2 className="text-2xl mt-4">Waiting for opponent's choice...</h2>
          </div>
        ) : (
          <div className="flex gap-10 justify-center items-center h-[95%]">
            {choices.map((choice) => (
              <button
                key={choice.name}
                className="bg-amber-500 rounded-md p-2 border-4"
                onClick={() => handleChoice(choice.name)}
              >
                <img
                  src={choice.icon}
                  alt={choice.name}
                  className="w-12 h-12"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ScoreDisplay = () => {
    const { scores } = useSelector((state) => state.rps);
    const user=useSelector(selectCurrentUser)
    const playerId = socket?.id;

    if (!scores || Object.keys(scores).length === 0) return null;

    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4 w-full max-w-md">
        <div className="flex justify-between">
          <div className="text-center">
            <p className="font-bold text-green-500">{user}</p>
            <p className="text-2xl">{scores[playerId] || 0}</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-red-500">Opponent</p>
            <p className="text-2xl">
              {Object.entries(scores).find(([id]) => id !== playerId)?.[1] || 0}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-center text-white relative">
      <h2 className="text-white text-5xl mb-4 font-bold tracking-wider flex justify-center">
        Rock Paper Scissors
      </h2>
      {gameMode === "friends" && roomName && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800 p-2 rounded">
          <button onClick={copyRoomId}>
            <p className="flex">
              Copy Room Id
              <FaCopy className="text-xl hover:text-gray-300" />
            </p>
          </button>
        </div>
      )}
      {roomName ? <ScoreDisplay /> : ""}

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
