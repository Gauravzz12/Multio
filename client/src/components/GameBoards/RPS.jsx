import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setResult,
  setRoomName,
  setOpponentChoice,
  resetGame,
} from "../../features/games/rpsSlice";
import rockIcon from "../../assets/images/RPS/rock.svg";
import paperIcon from "../../assets/images/RPS/paper.svg";
import scissorsIcon from "../../assets/images/RPS/scissors.svg";
import GameModeSelector from "../GameModeSelector";
import GameDisplay from "../GameDisplay";
import RoomManager from "../RoomManager";
import OpponentLoader from "../OpponentLoader";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const RPS = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, result, opponentChoice } = useSelector((state) => state.rps);
  const [socket, setSocket] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("roomAssigned", ({ roomId }) => {
      dispatch(setRoomName(roomId));
      setWaitingForOpponent(true);  
    });

    newSocket.on("startGame", () => {
      setGameStarted(true);
      setWaitingForOpponent(false);
      setOpponentDisconnected(false);
      dispatch(setOpponentChoice(null)); 
      dispatch(setResult(null)); 
    });

    newSocket.on("waitingForOpponent", () => {
      setWaitingForOpponent(true);
      setGameStarted(false);
    });

    newSocket.on("gameResult", (data) => {
      dispatch(setResult(data.result));
      dispatch(setOpponentChoice(data.opponentChoice));
      setWaitingForOpponent(false);
    });

    newSocket.on("waitingForPlayer", () => {
      setGameStarted(false);
      setWaitingForOpponent(true);
    });

    newSocket.on("playerLeft", () => {
      setGameStarted(false);
      setUserChoice(null);
      setWaitingForOpponent(true);  
      dispatch(resetGame());
      toast.info("Your opponent has left the game.");
      dispatch(setOpponentChoice(null));
      dispatch(setResult(null));
    });

    newSocket.on("opponentDisconnected", () => {
      setOpponentDisconnected(true);
      setGameStarted(false);
      setUserChoice(null);
      dispatch(resetGame());
      dispatch(setOpponentChoice(null));
      dispatch(setResult(null));
    });

    newSocket.on("roomNotFound", () => {
      toast.error("Room does not exist.");
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
    });

    newSocket.on("roomFull", () => {
      toast.error("The room is full.");
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      setUserChoice(null);
      setGameStarted(false);
      setWaitingForOpponent(false);
    };
  }, [dispatch]);

  useEffect(() => {
    if (socket && gameMode === "online" && !roomName) {
      socket.emit("joinRoom", { game: "RPS" });
    } else if (socket && gameMode === "friends" && roomName) {
      socket.emit("joinRoom", { game: "RPS", roomId: roomName });
    }
  }, [socket, gameMode, roomName]);

  const handleChoice = (choice) => {
    setUserChoice(choice);
    socket.emit("makeChoice", { roomId: roomName, choice });
  };

  const handlePlayAgain = () => {
    socket.emit("playAgain", { roomId: roomName });
    setUserChoice(null);
    dispatch(resetGame());
    setWaitingForOpponent(true);
    dispatch(setOpponentChoice(null));
    dispatch(setResult(null));
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
            <img src={choiceIcons[userChoice]} alt={userChoice} className="w-24 h-24" />
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
                <img src={choice.icon} alt={choice.name} className="w-12 h-12" />
              </button>
            ))}
            
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-center text-white relative">
      {(gameMode === "friends" || gameMode === "online") && roomName && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800 p-2 rounded">
          <span className="text-lg ">Room ID: {roomName}</span>
          <span className="text-lg">Socket ID: {socket.id}</span>

          <button onClick={copyRoomId}>
            <FaCopy className="text-xl hover:text-gray-300" />
          </button>
        </div>
      )}
      {opponentDisconnected ? (
        <div>
          <h2 className="text-2xl">Your opponent has disconnected.</h2>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setOpponentDisconnected(false);
              dispatch(setGameMode(null));
              dispatch(setRoomName(""));
            }}
          >
            Return to Game Mode Selection
          </button>
        </div>
      ) : !gameMode ? (
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
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <ChoiceButtons />
      )}
    </div>
  );
};

export default RPS;

