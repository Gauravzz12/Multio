import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
  setMatchInfo,
  resetMatchInfo
} from "../../features/games/gameSlice";
import GameModeSelector from "../GameModeSelector";
import OpponentLoader from "../OpponentLoader";
import { FaCopy, FaTimes } from "react-icons/fa";
import useSocket from "../../hooks/useSocket";
import ScoreBoard from "../ScoreBoard";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, selectCurrentAvatar } from "../../features/auth/authSlice";
import GameResultDisplay from "../GameResultDisplay";
import defaultAvatar from '../../assets/images/default-avatar.png';

const MemoryMatch = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, matchInfo } = useSelector((state) => state.game);
  const [socket, setSocket] = useState(null);
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
        ? "http://localhost:5000/memorymatch"
        : "https://multio-backend.onrender.com/memorymatch"
    );
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      dispatch(resetScores());
      setWaitingForOpponent(false);
      setShowScore(false);
      setSocket(null);
      dispatch(resetMatchInfo());
    };
  }, [dispatch]);

  useSocket(socket, setWaitingForOpponent, setGameOver);

  const closeGameBoard = () => {
    navigate("/Games");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <button
          onClick={closeGameBoard}
          className="fixed top-6 right-6 z-50 p-3 glass rounded-2xl border border-white/20 text-white hover:text-red-400 hover:border-red-400/50 transition-all duration-300 hover:scale-110 group"
        >
          <FaTimes size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            MEMORY MATCH
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

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

        <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
          <p className="text-xl text-slate-300 mb-6">
            Memory Match is coming soon! Challenge your memory with card matching puzzles.
          </p>
          <div className="text-sm text-slate-400">
            Expected Release: March 2025
          </div>
        </div>

        {showScore && <ScoreBoard socket={socket} />}
        {!gameMode ? (
          <GameModeSelector socket={socket} />
        ) : waitingForOpponent ? (
          <OpponentLoader />
        ) : gameOver ? (
          <GameResultDisplay socket={socket} />
        ) : null}
      </div>
    </div>
  );
};

export default MemoryMatch;