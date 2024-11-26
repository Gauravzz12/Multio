import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setGameMode, setRoomName } from "../../features/games/gameSlice";
import GameModeSelector from "../GameModeSelector";
import RoomManager from "../RoomManager";
import OpponentLoader from "../OpponentLoader";
import { FaCopy } from "react-icons/fa";
import useSocket from "../../hooks/useSocket";
import { selectCurrentUser } from "../../features/auth/authSlice";

const TTT = () => {
  const dispatch = useDispatch();
  const { gameMode, roomName } = useSelector((state) => state.game);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [mySymbol, setMySymbol] = useState("");
  const [socket, setSocket] = useState(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const user = useSelector(selectCurrentUser);
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
      dispatch(setResult(null));
    });

    newSocket.on("updateBoard", (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
    });

    newSocket.on("gameOver", (data) => {
      setBoard(data.board);
      if (data.winner) {
        if (data.winner === socket.id) {
          setResult("You win!");
        } else {
          setResult("You lose!");
        }
      } else {
        setResult("It's a draw!");
      }
    });

    newSocket.on("playerDisconnected", () => {
      dispatch(setResult("Opponent disconnected."));
    });

    return () => {
      if (newSocket) newSocket.disconnect();
      dispatch(setGameMode(null));
      dispatch(setRoomName(""));
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
    return (
      <td
        key={`${x}-${y}`}
        onClick={() => handleCellClick(x, y)}
        className="w-24 h-24 border-2 border-gray-400 cursor-pointer text-4xl text-center"
      >
        {board[x][y]}
      </td>
    );
  };

  return (
    <div className="flex flex-col items-center text-center text-white relative">
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
      {!gameMode ? (
        <GameModeSelector />
      ) : gameMode === "friends" && !roomName ? (
        <RoomManager />
      ) : waitingForOpponent ? (
        <OpponentLoader />
      ) : (
        <>
          <div>
            <h3>
              You are: <span className="font-bold">{mySymbol}</span>
            </h3>
            <h3>
              {currentPlayer === socket?.id ? "Your turn" : "Opponent's turn"}
            </h3>
            {result && <h2 className="text-3xl mt-4">{result}</h2>}
            <table className="mt-4">
              <tbody>
                {board.map((row, x) => (
                  <tr key={x}>{row.map((cell, y) => renderCell(x, y))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TTT;
