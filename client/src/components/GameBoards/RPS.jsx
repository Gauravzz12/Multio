import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
  setMatchInfo,
} from "../../features/games/gameSlice";
import rockIcon from "../../assets/images/RPS/rock.svg";
import paperIcon from "../../assets/images/RPS/paper.svg";
import scissorsIcon from "../../assets/images/RPS/scissors.svg";
import GameModeSelector from "../GameModeSelector";
import OpponentLoader from "../OpponentLoader";
import { FaCopy, FaTimes } from "react-icons/fa";
import useSocket from "../../hooks/useSocket";
import ScoreBoard from "../ScoreBoard";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, selectCurrentAvatar } from "../../features/auth/authSlice";
import GameResultDisplay from "../GameResultDisplay";
import defaultAvatar from '../../assets/images/default-avatar.png';

const RPS = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, matchInfo } = useSelector((state) => state.game);
  const [socket, setSocket] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [result, setResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const userAvatar = useSelector(selectCurrentAvatar) === 'Guest' ? defaultAvatar : useSelector(selectCurrentAvatar);

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
      dispatch(setMatchInfo({ rounds: data.rounds, playersInfo: data.playersInfo }));
      setShowScore(true);
    });

    newSocket.on("roundOver", (data) => {
      setResult(data.result);
      setOpponentChoice(data.opponentChoice);
      dispatch(setScores(data.scores));
      setWaitingForOpponent(false);
    });

    newSocket.on("playerLeft", () => {
      setShowScore(false);
      setWaitingForOpponent(true);
      dispatch(resetScores());
      dispatch(setMatchInfo({ rounds: null, winner: null, loser: null, playersInfo: null }));
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      setUserChoice(null);
      setWaitingForOpponent(false);
      setShowScore(false);
      newSocket.off("startGame");
      newSocket.off("roundOver");
      newSocket.off("startNextRound");
      newSocket.off("scoresReset");
    };
  }, []);

  useSocket(socket, setWaitingForOpponent, setGameOver);

  useEffect(() => {
    if (!socket) return;
    if (socket && gameMode === "online" && !roomName) {
      socket.emit("joinRoom", { roomId: null, userInfo: { userName: user, userAvatar: userAvatar, socketID: socket.id } });
    } else if (socket && gameMode === "custom" && roomName) {
      socket.emit("joinRoom", { roomId: roomName, userInfo: { userName: user, userAvatar: userAvatar, socketID: socket.id }, rounds: matchInfo.rounds });
    }
  }, [socket, gameMode, roomName]);

  const handleChoice = (choice) => {
    setUserChoice(choice);
    socket.emit("makeChoice", { roomId: roomName, choice });
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomName);
  };

  const closeGameBoard = () => {
    navigate("/Games");
  };

  const choiceIcons = {
    Rock: rockIcon,
    Paper: paperIcon,
    Scissors: scissorsIcon,
  };

  const ChoiceButtons = () => {
    if (!roomName) return;
    const choices = [
      { name: "Rock", icon: rockIcon },
      { name: "Paper", icon: paperIcon },
      { name: "Scissors", icon: scissorsIcon },
    ];

    return (
      <div className="flex flex-col items-center justify-center h-48">
        {userChoice ? (
          <div>
            <h2 className="text-xl md:text-2xl">You chose:</h2>
            <img
              src={choiceIcons[userChoice]}
              alt={userChoice}
              className="w-12 h-12 md:w-16 md:h-16 mx-auto"
            />
            <p className="text-lg md:text-xl mt-2">{userChoice}</p>
            <h2 className="text-xl md:text-2xl mt-3">Waiting for opponent's choice...</h2>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-6 justify-center items-center h-full">
            {choices.map((choice) => (
              <button
                key={choice.name}
                className="bg-amber-500 rounded-md p-2 border-2 transform hover:scale-105 transition duration-300 w-12 h-12 md:w-16 md:h-16"
                onClick={() => handleChoice(choice.name)}
              >
                <img
                  src={choice.icon}
                  alt={choice.name}
                  className="w-6 h-6 md:w-8 md:h-8 mx-auto"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center mt-4 text-center text-white relative min-h-screen p-4 max-w-8xl mx-auto w-full  h-[90vh] bg-gray-900 rounded-xl shadow-2xl  overflow-hidden border border-gray-700">
      <button
        onClick={closeGameBoard}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <FaTimes size={24} />
      </button>
      <h2 className="text-white text-4xl md:text-5xl mb-4 font-bold tracking-wider flex justify-center">
        Rock Paper Scissors
      </h2>
      {gameMode === "custom" && roomName && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-gray-800 p-2 rounded">
          <button onClick={copyRoomId}>
            <p className="flex items-center">
              Copy Room Id
              <FaCopy className="text-xl hover:text-gray-300 ml-1" />
            </p>
          </button>
        </div>
      )}
      {showScore ? <ScoreBoard socketId={socket?.id} /> : ""}
      {!gameMode ? (
        <GameModeSelector socket={socket} />
      ) : waitingForOpponent ? (
        <OpponentLoader />
      ) : !result ? (
        <ChoiceButtons />
      ) : gameOver ? (<GameResultDisplay socket={socket} />) : (
        <div className={`flex flex-col items-center mt-4 p-4 rounded-xl backdrop-blur-sm ${result === "You win!" ? "bg-green-500/10" :
          result === "You lose!" ? "bg-red-500/10" : "bg-yellow-500/10"
          }`}>
          <div className="flex justify-around w-full max-w-sm mb-4">
            <div className="flex flex-col items-center">
              <h2 className="text-xl mb-2">You</h2>
              <img src={choiceIcons[userChoice]} alt={userChoice}
                className="w-16 h-16 md:w-20 md:h-20 animate-pulse" />
              <p className="text-base mt-1">{userChoice}</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-xl mb-2">Opponent</h2>
              <img src={choiceIcons[opponentChoice]} alt={opponentChoice}
                className="w-16 h-16 md:w-20 md:h-20 animate-pulse" />
              <p className="text-base mt-1">{opponentChoice}</p>
            </div>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold ${result === "You win!" ? "text-green-500" :
            result === "You lose!" ? "text-red-500" : "text-yellow-500"
            }`}>
            {result}
          </h1>
        </div>
      )}
    </div>
  );
};

export default RPS;