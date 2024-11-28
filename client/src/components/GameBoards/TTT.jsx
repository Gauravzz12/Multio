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
      content = <FaTimes className="text-violet-500 w-16 h-16" />;
    } else if (value === "O") {
      content = <FaRegCircle className="text-blue-500 w-16 h-16" />;
    }

    return (
      <td
        key={`${x}-${y}`}
        onClick={() => handleCellClick(x, y)}
        className={`w-24 h-24 border-4 ${
          currentPlayer === socket?.id ? "border-green-500" : "border-red-500"
        } cursor-pointertext-4xl text-center  `}
      >
        <div className="flex items-center justify-center h-full">{content}</div>
      </td>
    );
  };
  return (
    <div className="flex flex-col items-center text-center text-white relative justify-center">
      <h2 className="text-white text-5xl mb-4 font-bold tracking-wider flex justify-center">
        Tic Tac Toe
      </h2>
      {gameMode === "friends" && roomName && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800 p-2 rounded">
          <button onClick={copyRoomId}>
            <p className="flex">
              Copy Room Id
              <FaCopy className="text-xl hover:text-gray-300 ml-2" />
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
      ) : result ? (
        <h2
          className={`text-4xl font-bold w-64 h-64 flex items-center justify-center ${
            result === "winner"
              ? "text-green-500"
              : result === "loser"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {result === "winner"
            ? " You won! 😁"
            : result === "loser"
            ? "You lost! 😔"
            : "It's a draw! 😐"}
        </h2>
      ) : (
        <div>
          <h3 className="text-3xl ">
            You are : <span className="font-bold">{mySymbol}</span>
          </h3>
          <h3
            className={`${
              currentPlayer === socket?.id ? "text-green-500" : "text-red-500"
            } text-3xl font-bold mt-4
            `}
          >
            {currentPlayer === socket?.id ? "Your turn" : "Opponent's turn"}
          </h3>
          <table className="mt-4">
            <tbody
              className={`mt-4 border-4 ${
                currentPlayer === socket?.id
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              {board.map((row, rowIndex) => (
                <tr
                  className={`border-4 ${
                    currentPlayer === socket?.id
                      ? "border-green-500"
                      : "border-red-500"
                  } `}
                  key={rowIndex}
                >
                  {row.map((cell, cellIndex) =>
                    renderCell(rowIndex, cellIndex)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TTT;
