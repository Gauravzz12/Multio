import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
} from "../../features/games/gameSlice";
import GameModeSelector from "../GameModeSelector";
import RoomManager from "../RoomManager";
import OpponentLoader from "../OpponentLoader";
import { FaCopy } from "react-icons/fa";
import useSocket from "../../hooks/useSocket";
import ScoreBoard from "../ScoreBoard";
import { FaTimes, FaRegCircle } from "react-icons/fa";
const TTT = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName, scores } = useSelector((state) => state.game);
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
      setResult(null);
    });

    newSocket.on("updateBoard", (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
    });

    newSocket.on("gameOver", (data) => {
      console.log(data);
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

    newSocket.on("playerDisconnected", () => {
      setResult("Opponent disconnected.");
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
      dispatch(resetScores());
      setWaitingForOpponent(false);
      newSocket.off("roomAssigned");
      newSocket.off("startGame");
      newSocket.off("updateBoard");
      newSocket.off("gameOver");
      newSocket.off("playerDisconnected");
    };
  }, [dispatch]);

  useSocket(socket, setWaitingForOpponent);

  useEffect(() => {
    if (socket && gameMode === "online" && !roomName) {
      socket.emit("joinRoom", {});
    } else if (socket && gameMode === "friends" && roomName) {
      socket.emit("joinRoom", { roomId: roomName });
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
        className={`relative w-16 h-16 md:w-24 md:h-24 border-4 ${
          currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
        } cursor-pointer hover:bg-gray-800 transition-colors duration-300`}
      >
        <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
          {content}
        </div>
      </td>
    );
  };

  return (
    <div className="flex flex-col items-center text-center text-white relative min-h-screen p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl mb-8 font-bold tracking-wider flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
        Tic Tac Toe
      </h2>

      {gameMode === "friends" && roomName && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-700/80">
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

      {roomName &&<ScoreBoard socketId={socket?.id} />}

      {!gameMode ? (
        <GameModeSelector />
      ) : gameMode === "friends" && !roomName ? (
        <RoomManager />
      ) : waitingForOpponent ? (
        <OpponentLoader />
      ) : result ? (
        <div className={`p-6 rounded-xl backdrop-blur-sm ${
          result === "winner" ? "bg-green-500/10" : 
          result === "loser" ? "bg-red-500/10" : "bg-yellow-500/10"
        }`}>
          <h2 className={`text-2xl md:text-4xl font-bold flex items-center justify-center min-h-[12rem] ${
            result === "winner" ? "text-green-500" :
            result === "loser" ? "text-red-500" : "text-yellow-500"
          }`}>
            {result === "winner" ? "You won! 😁" :
             result === "loser" ? "You lost! 😔" : "It's a draw! 😐"}
          </h2>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-xl md:text-3xl">
            You are: <span className="font-bold">{mySymbol}</span>
          </h3>
          <h3 className={`text-xl md:text-3xl font-bold ${
            currentPlayer === socket?.id ? "text-green-500" : "text-red-500"
          }`}>
            {currentPlayer === socket?.id ? "Your turn" : "Opponent's turn"}
          </h3>
          <div className="mt-4 p-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
            <table>
              <tbody className={`border-4 rounded-lg ${
                currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
              }`}>
                {board.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`border-4 ${
                    currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
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
