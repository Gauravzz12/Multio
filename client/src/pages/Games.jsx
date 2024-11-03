import React, { useEffect, useState } from "react";
import RPS from "../components/GameBoards/RPS";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomSize, setRoomSize] = useState({
    RPS: { min: 2, max: 2 },
    TTT: { min: 2, max: 2 },
  });

  const handleGameClick = (name, game) => {
    
    setSelectedGame(game);
  };

  const closeGameBoard = () => {
    setSelectedGame(null);
  };

  return (
    <div className={`relative `}>
      <h1 className="text-white text-6xl text-center">Games </h1>

      <div className="grid grid-cols-2  gap-6 mt-8 place-items-center  ">
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleGameClick("RPS", "Rock Paper Scissors")}
        >
          <h2 className="text-white text-2xl mb-4">Rock Paper Scissors</h2>
          <p className="text-gray-400">
            A classic hand game of strategy and luck.
          </p>
        </div>
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleGameClick("TTT", "Tic Tac Toe")}
        >
          <h2 className="text-white text-2xl mb-4">Tic Tac Toe</h2>
          <p className="text-gray-400">A simple game of Xs and Os.</p>
        </div>
      </div>

      {selectedGame && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="w-[95%] h-[95%] bg-gray-900 p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeGameBoard}
            >
              &times;
            </button>
            <h2 className="text-white text-4xl mb-4 flex justify-center">
              {selectedGame}
            </h2>
            {selectedGame == "Rock Paper Scissors" ? <RPS /> : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
