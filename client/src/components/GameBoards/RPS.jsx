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
        : "https://multio-backend.onrender.com/rps"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-4 min-h-[80vh]">
        {/* Close Button */}
        <button
          onClick={closeGameBoard}
          className="fixed top-6 right-6 z-50 p-3 glass rounded-2xl border border-white/20 text-white hover:text-red-400 hover:border-red-400/50 transition-all duration-300 hover:scale-110 group"
        >
          <FaTimes size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
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
        <div className="w-full flex flex-col md:flex-row md:items-start md:justify-center gap-8 items-center justify-center">
          {showScore && (
            <div className="w-full md:w-1/3 flex-shrink-0 mb-8 md:mb-0">
              <ScoreBoard socket={socket} />
            </div>
          )}
          <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
            {!gameMode ? (
              <GameModeSelector socket={socket} />
            ) : waitingForOpponent ? (
              <OpponentLoader />
            ) : !result ? (
              <div className="glass backdrop-blur-2xl border border-white/20 rounded-3xl px-8 py-12 text-center flex flex-col items-center justify-center gap-10 shadow-2xl w-full max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse tracking-wide">Choose your move</h2>
                <div className="flex gap-10 md:gap-20 justify-center items-center w-full">
                  {['Rock', 'Paper', 'Scissors'].map((choice) => (
                    <button
                      key={choice}
                      className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-full p-6 border-4 border-transparent hover:border-yellow-400 transform hover:scale-110 transition duration-300 shadow-2xl flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-pink-400/40 w-28 h-28 md:w-36 md:h-36 relative group"
                      onClick={() => handleChoice(choice)}
                      disabled={!!userChoice}
                    >
                      <img
                        src={choiceIcons[choice]}
                        alt={choice}
                        className="w-16 h-16 md:w-24 md:h-24 mb-2 drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-lg md:text-2xl font-semibold text-white tracking-wide drop-shadow-md capitalize">{choice}</span>
                      {userChoice === choice && (
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-700/80 text-white text-xs rounded-full animate-pulse border border-purple-400">Selected</span>
                      )}
                    </button>
                  ))}
                </div>
                {userChoice && (
                  <div className="mt-8 text-2xl text-purple-300 animate-pulse font-semibold">Waiting for opponent's choice...</div>
                )}
              </div>
            ) : gameOver ? (
              <GameResultDisplay socket={socket} />
            ) : (
              <div className={`glass backdrop-blur-2xl border border-white/20 rounded-3xl px-8 py-12 text-center flex flex-col items-center gap-10 shadow-2xl w-full max-w-2xl mx-auto ${
                result === "You win!" ? "bg-green-500/10" :
                result === "You lose!" ? "bg-red-500/10" : "bg-yellow-500/10"
              }`}>
                <div className="flex flex-col md:flex-row justify-around w-full max-w-2xl mx-auto mb-6 gap-10 md:gap-0">
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl mb-2 text-white font-semibold">You</h2>
                    <div className="relative">
                      <img 
                        src={choiceIcons[userChoice]} 
                        alt={userChoice}
                        className="w-24 h-24 md:w-28 md:h-28 animate-bounce rounded-full border-4 border-purple-400 bg-slate-800 shadow-xl" 
                      />
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-lg mt-3 text-slate-300 capitalize">{userChoice}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-white animate-pulse px-8">VS</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl mb-2 text-white font-semibold">Opponent</h2>
                    <div className="relative">
                      <img 
                        src={choiceIcons[opponentChoice]} 
                        alt={opponentChoice}
                        className="w-24 h-24 md:w-28 md:h-28 animate-bounce rounded-full border-4 border-pink-400 bg-slate-800 shadow-xl" 
                      />
                      <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-lg mt-3 text-slate-300 capitalize">{opponentChoice}</p>
                  </div>
                </div>
                <h1 className={`text-4xl md:text-5xl font-extrabold ${
                  result === "You win!" ? "text-green-400" :
                  result === "You lose!" ? "text-red-400" : "text-yellow-400"
                } animate-pulse drop-shadow-lg`}>{result}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPS;