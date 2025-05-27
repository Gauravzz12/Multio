import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, selectCurrentAvatar } from "../../features/auth/authSlice";
import {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
  setMatchInfo,
  resetMatchInfo
} from "../../features/games/gameSlice";
import { FaTimes, FaCopy } from "react-icons/fa";
import rockIcon from "../../assets/images/RPS/rock.svg";
import paperIcon from "../../assets/images/RPS/paper.svg";
import scissorsIcon from "../../assets/images/RPS/scissors.svg";
import defaultAvatar from "../../assets/images/default-avatar.png";
import GameModeSelector from "../GameModeSelector";
import OpponentLoader from "../OpponentLoader";
import ScoreBoard from "../ScoreBoard";
import GameResultDisplay from "../GameResultDisplay";
import useSocket from "../../hooks/useSocket";

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
      dispatch(resetMatchInfo());
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      setUserChoice(null);
      setWaitingForOpponent(false);
      setShowScore(false);
      setSocket(null)
      dispatch(resetMatchInfo());
      newSocket.off("startGame");
      newSocket.off("roundOver");
      newSocket.off("startNextRound");
      newSocket.off("scoresReset");
    };
  }, []);

  useSocket(socket, setWaitingForOpponent, setGameOver);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      if (gameMode === "online" && !roomName) {
        socket.emit("joinRoom", {
          roomId: null,
          userInfo: {
            userName: user,
            userAvatar: userAvatar,
            socketID: socket.id
          },
          rounds: matchInfo.rounds 
        });
      } else if (gameMode === "custom" && roomName) {
        socket.emit("joinRoom", {
          roomId: roomName,
          userInfo: {
            userName: user,
            userAvatar: userAvatar,
            socketID: socket.id
          },
          rounds: matchInfo.rounds 
        });
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on('connect', handleConnect);
    }

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [socket, gameMode, roomName, user, userAvatar ]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Close Button */}
        <button
          onClick={closeGameBoard}
          className="fixed top-6 right-6 z-50 p-3 glass rounded-2xl border border-white/20 text-white hover:text-red-400 hover:border-red-400/50 transition-all duration-300 hover:scale-110 group"
        >
          <FaTimes size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Game Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            ROCK PAPER SCISSORS
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Room ID Display */}
        {gameMode === "custom" && roomName && (
          <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-700/80">
            <button
              onClick={copyRoomId}
              className="text-sm md:text-base hover:scale-105 transition-transform duration-300"
            >
              <p className="flex items-center">
                Copy Room Id
                <FaCopy className="text-xl hover:text-gray-300 ml-2 transition-colors duration-300" />
              </p>
            </button>
          </div>
        )}

        {/* Main Game Content */}
        <div className="w-full max-w-4xl mx-auto">
          {showScore && <ScoreBoard socket={socket} />}
          
          {!gameMode ? (
            <GameModeSelector socket={socket} />
          ) : waitingForOpponent ? (
            <OpponentLoader />
          ) : !result ? (
            <ChoiceButtons />
          ) : gameOver ? (
            <GameResultDisplay socket={socket} />
          ) : (
            <div className={`glass backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center ${
              result === "You win!" ? "bg-green-500/10" :
              result === "You lose!" ? "bg-red-500/10" : "bg-yellow-500/10"
            }`}>
              <div className="flex justify-around w-full max-w-lg mx-auto mb-6">
                <div className="flex flex-col items-center">
                  <h2 className="text-xl mb-4 text-white font-semibold">You</h2>
                  <div className="relative">
                    <img 
                      src={choiceIcons[userChoice]} 
                      alt={userChoice}
                      className="w-20 h-20 md:w-24 md:h-24 animate-bounce" 
                    />
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-lg mt-3 text-slate-300">{userChoice}</p>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-4xl font-bold text-white animate-pulse">VS</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <h2 className="text-xl mb-4 text-white font-semibold">Opponent</h2>
                  <div className="relative">
                    <img 
                      src={choiceIcons[opponentChoice]} 
                      alt={opponentChoice}
                      className="w-20 h-20 md:w-24 md:h-24 animate-bounce" 
                    />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-lg mt-3 text-slate-300">{opponentChoice}</p>
                </div>
              </div>
              
              <h1 className={`text-3xl md:text-4xl font-bold ${
                result === "You win!" ? "text-green-500" :
                result === "You lose!" ? "text-red-500" : "text-yellow-500"
              }`}>
                {result}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RPS;