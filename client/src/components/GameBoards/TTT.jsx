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
import { FaCopy } from "react-icons/fa";
import useSocket from "../../hooks/useSocket";
import ScoreBoard from "../ScoreBoard";
import { FaTimes, FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, selectCurrentAvatar } from "../../features/auth/authSlice";
import GameResultDisplay from "../GameResultDisplay";
import defaultAvatar from '../../assets/images/default-avatar.png';

const TTT = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, matchInfo } = useSelector((state) => state.game);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [mySymbol, setMySymbol] = useState("");
  const [socket, setSocket] = useState(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [result, setResult] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [gameOver, setGameOver] = useState(false);
  const userAvatar = useSelector(selectCurrentAvatar) === 'Guest' ? defaultAvatar : useSelector(selectCurrentAvatar);


  useEffect(() => {
    const newSocket = io(
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/ttt"
        : "https://multio-backend.up.railway.app/ttt"
    );
    setSocket(newSocket);

    newSocket.on("startGame", (data) => {
      setWaitingForOpponent(false);
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setMySymbol(data.symbols[newSocket.id]);
      dispatch(setScores(data.scores));
      dispatch(setMatchInfo({ rounds: data.rounds, playersInfo: data.playersInfo }));
      setResult(null);
      setShowScore(true);

    });

    newSocket.on("updateBoard", (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
    });

    newSocket.on("roundOver", (data) => {
      setBoard(data.board);
      dispatch(setScores(data.scores));
      if (data.winner) {
        if (data.winner === newSocket.id) {
          setResult("winner");
        } else {
          setResult("loser");
        }
      } else {
        setResult("draw");
      }
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
      dispatch(resetScores());
      setWaitingForOpponent(false);
      setShowScore(false);
      setSocket(null);
      dispatch(resetMatchInfo());
      newSocket.off("roomAssigned");
      newSocket.off("startGame");
      newSocket.off("updateBoard");
      newSocket.off("roundOver");
    };
  }, [dispatch]);

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
          }
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
  }, [socket, gameMode, roomName, user, userAvatar]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomName);
  };

  const handleCellClick = (x, y) => {
    if (currentPlayer !== socket.id) return;
    if (board[x][y] !== "") return;
    socket.emit("makeMove", { roomId: roomName, x, y });
  };

  const closeGameBoard = () => {
    navigate("/Games");
  };

  const renderCell = (x, y) => {
    const value = board[x][y];
    let content = null;

    if (value === "X") {
      content = <FaTimes className="w-full h-full text-violet-500 transition-colors duration-300" />;
    } else if (value === "O") {
      content = <FaRegCircle className="w-full h-full text-blue-500 transition-colors duration-300" />;
    }

    return (
      <td
        key={`${x}-${y}`}
        onClick={() => handleCellClick(x, y)}
        className={`relative w-12 h-12 md:w-16 md:h-16 border-2 ${currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
          } cursor-pointer hover:bg-gray-800 transition-colors duration-300`}
      >
        <div className="absolute inset-0 flex items-center justify-center p-2 md:p-3">
          {content}
        </div>
      </td>
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 min-h-[80vh]">
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
            TIC TAC TOE
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
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

        {showScore && <ScoreBoard socket={socket} />}
        {!gameMode ? (
          <GameModeSelector socket={socket} />
        ) : waitingForOpponent ? (
          <OpponentLoader />
        ) : result ? gameOver ? (
          <GameResultDisplay socket={socket} />
        ) : (
          <div className={`glass backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center mb-8 shadow-2xl ${
            result === "winner" ? "bg-green-500/10" :
            result === "loser" ? "bg-red-500/10" : "bg-yellow-500/10"
          }`}>
            <div className="flex flex-col items-center space-y-2">
              <h2 className={`text-2xl md:text-3xl font-bold ${
                result === "winner" ? "text-green-400" :
                result === "loser" ? "text-red-400" : "text-yellow-400"
              } animate-pulse`}>
                {result === "winner" ? "You won! 🎉" :
                  result === "loser" ? "You lost! 😔" : "It's a draw! 🤝"}
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8 w-full">
            <div className="glass backdrop-blur-2xl border-4 border-purple-500/60 rounded-3xl p-10 text-center shadow-2xl w-full max-w-lg mx-auto">
              <h3 className="text-xl md:text-2xl mb-2 text-white">You are: <span className="font-bold text-purple-400">{mySymbol}</span></h3>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${currentPlayer === socket?.id ? "text-green-400" : "text-red-400"} animate-pulse`}>
                {currentPlayer === socket?.id ? "Your turn" : "Opponent's turn"}
              </h3>
              <div className="mt-4 p-4 rounded-3xl bg-gradient-to-br from-purple-900/60 to-slate-900/60 backdrop-blur-md border-4 border-purple-700/60 shadow-inner flex items-center justify-center">
                <table className="mx-auto">
                  <tbody className="">
                    {board.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${rowIndex}-${cellIndex}`}
                            onClick={() => handleCellClick(rowIndex, cellIndex)}
                            className={`relative w-24 h-24 md:w-28 md:h-28 border-4 ${currentPlayer === socket?.id ? "border-green-500" : "border-red-500"} cursor-pointer hover:bg-purple-800/40 transition-colors duration-300 rounded-2xl group shadow-xl m-2`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center p-2 md:p-3">
                              {cell === "X" && <FaTimes className="w-16 h-16 md:w-20 md:h-20 text-violet-400 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />}
                              {cell === "O" && <FaRegCircle className="w-16 h-16 md:w-20 md:h-20 text-blue-400 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TTT;