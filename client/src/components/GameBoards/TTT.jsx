import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const TTT = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [symbols, setSymbols] = useState({});
  const [waiting, setWaiting] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [waitingForRematch, setWaitingForRematch] = useState(false);

  useEffect(() => {
    const newSocket = io(import.meta.env.MODE === "development" ? "http://localhost:5000/ttt" : "https://multio.netlify.app/ttt",);
    setSocket(newSocket);

    newSocket.on('waitingForOpponent', () => {
      setWaiting(true);
    });

    newSocket.on('startGame', ({ board, currentPlayer, symbols }) => {
      setBoard(board);
      setCurrentPlayer(currentPlayer);
      setSymbols(symbols);
      setWaiting(false);
      setGameOver(false);
      setWinner(null);
    });

    newSocket.on('updateBoard', ({ board, currentPlayer, symbols }) => {
      setBoard(board);
      setCurrentPlayer(currentPlayer);
      setSymbols(symbols);
    });

    newSocket.on('gameOver', ({ board, winner, symbols }) => {
      setBoard(board);
      setGameOver(true);
      setWinner(winner);
      setSymbols(symbols);
    });

    newSocket.on('opponentDisconnected', () => {
      toast.info('Opponent disconnected. Game over.');
      resetGame();
    });

    newSocket.on('notYourTurn', () => {
      alert("It's not your turn!");
    });

    newSocket.on('invalidMove', () => {
      alert('Invalid move!');
    });

    newSocket.on('roomFull', () => {
      alert('Room is full.');
      resetGame();
    });

    newSocket.on('waitingForRematch', () => {
      setWaitingForRematch(true);
    });

    return () => {
      if(newSocket)  newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('joinTTTRoom', { roomId });
    }
  }, [socket, roomId]);

  const handleCellClick = (x, y) => {
    if (board[x][y] === '' && !gameOver && currentPlayer === socket.id) {
      socket.emit('tttMove', { roomId, x, y });
    }
  };

  const handlePlayAgain = () => {
    socket.emit('playAgain', { roomId });
    setWaitingForRematch(true);
  };

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('');
    setSymbols({});
    setWaiting(false);
    setGameOver(false);
    setWinner(null);
    setWaitingForRematch(false);
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-4xl mb-4">Tic Tac Toe</h2>
      {!roomId && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter room ID or leave blank"
            className="p-2 bg-gray-800 border border-gray-700 rounded"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            onClick={() => {
              if (socket) {
                socket.emit('joinTTTRoom', { roomId });
              }
            }}
            className="ml-2 px-4 py-2 bg-blue-600 rounded"
          >
            Join Room
          </button>
        </div>
      )}
      {waiting && <p>Waiting for opponent...</p>}
      {!waiting && currentPlayer && (
        <>
          <p>Your Symbol: {symbols[socket.id]}</p>
          <p>{currentPlayer === socket.id ? "Your turn" : "Opponent's turn"}</p>
          <div className="grid grid-cols-3 gap-2 w-64 mx-auto mt-4">
            {board.map((row, x) =>
              row.map((cell, y) => (
                <div
                  key={`${x}-${y}`}
                  className="border border-gray-500 h-16 flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-700"
                  onClick={() => handleCellClick(x, y)}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
          {gameOver && (
            <div className="mt-4">
              {winner ? (
                winner === socket.id ? <p>You won!</p> : <p>You lost!</p>
              ) : (
                <p>It's a draw!</p>
              )}
              <button
                onClick={handlePlayAgain}
                className="mt-2 px-4 py-2 bg-green-600 rounded"
              >
                Play Again
              </button>
              {waitingForRematch && <p>Waiting for opponent to rematch...</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TTT;