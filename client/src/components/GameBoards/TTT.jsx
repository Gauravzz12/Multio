import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
  setMatchInfo
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
      dispatch(setMatchInfo({ rounds: data.rounds,playersInfo:data.playersInfo }));
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
      dispatch(setMatchInfo({ rounds: null, winner: null, loser: null, playersInfo: null }));
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      dispatch(resetScores());
      setWaitingForOpponent(false);
      setShowScore(false);  
      newSocket.off("roomAssigned");
      newSocket.off("startGame");
      newSocket.off("updateBoard");
      newSocket.off("roundOver");
    };
  }, [dispatch]);

  useSocket(socket, setWaitingForOpponent, setGameOver);

  useEffect(() => {
    if (!socket) return;
    if (socket && gameMode === "online" && !roomName) {
      socket.emit("joinRoom", { roomId: null,  userInfo: {userName:user,userAvatar:userAvatar,socketID:socket.id}});
    } else if (socket && gameMode === "custom" && roomName) {
      socket.emit("joinRoom", { roomId: roomName, userInfo: {userName:user,userAvatar:userAvatar,socketID:socket.id}, rounds: matchInfo.rounds });
    }
  }, [socket, gameMode, roomName]);

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
    <div className="flex flex-col items-center mt-4 text-center text-white relative min-h-screen p-4 max-w-8xl mx-auto w-full  h-[90vh] bg-gray-900 rounded-xl shadow-2xl  overflow-hidden border border-gray-700">
      <button
        onClick={closeGameBoard}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <FaTimes size={24} />
      </button>
      <h2 className="text-3xl md:text-5xl mb-8 font-bold tracking-wider flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
        Tic Tac Toe
      </h2>

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



      {showScore && <ScoreBoard socketId={socket?.id} />}
      {!gameMode ? (
        <GameModeSelector socket={socket} />
      ) : waitingForOpponent ? (
        <OpponentLoader />
      ) : result ? gameOver ? (<GameResultDisplay socket={socket} />) : (
        <div className={`p-4 rounded-xl backdrop-blur-sm mb-4 ${result === "winner" ? "bg-green-500/10" :
          result === "loser" ? "bg-red-500/10" : "bg-yellow-500/10"
          }`}>
          <div className="flex flex-col items-center space-y-2">
            <h2 className={`text-xl md:text-3xl font-bold ${result === "winner" ? "text-green-500" :
              result === "loser" ? "text-red-500" : "text-yellow-500"
              }`}>
              {result === "winner" ? "You won! 🎉" :
                result === "loser" ? "You lost! 😔" : "It's a draw! 🤝"}
            </h2>

          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-xl md:text-3xl">
            You are: <span className="font-bold">{mySymbol}</span>
          </h3>
          <h3 className={`text-xl md:text-3xl font-bold ${currentPlayer === socket?.id ? "text-green-500" : "text-red-500"
            }`}>
            {currentPlayer === socket?.id ? "Your turn" : "Opponent's turn"}
          </h3>
          <div className="mt-4 p-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <table>
              <tbody className={`border-4 rounded-lg ${currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
                }`}>
                {board.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`border-4 ${currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
                    }`}>
                    {row.map((cell, cellIndex) => renderCell(rowIndex, cellIndex))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TTT;