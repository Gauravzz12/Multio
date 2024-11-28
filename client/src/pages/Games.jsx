import React, { useState } from "react";
import RPS from "../components/GameBoards/RPS";
import TTT from "../components/GameBoards/TTT";

function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const closeGameBoard = () => {
    setSelectedGame(null);
  };

  const renderGameBoard = () => {
    switch (selectedGame) {
      case "RPS":
        return <RPS />;
      case "TTT":
        return <TTT />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl text-center font-bold mb-12 animate-fade-in">
          Choose Your Game
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-8 place-items-center">
          {[
            {
              title: "Rock Paper Scissors",
              description: "A classic hand game of strategy and luck.",
              game: "RPS",
              icon: "✌️",
            },
            {
              title: "Tic Tac Toe",
              description: "A simple game of Xs and Os.",
              game: "TTT",
              icon: "⭕",
            },
          ].map((game) => (
            <div
              key={game.game}
              className="w-full max-w-sm bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600"
              onClick={() => handleGameClick(game.game)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{game.icon}</span>
                <div>
                  <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2">
                    {game.title}
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {game.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedGame && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4 animate-fade-in">
            <div className="w-full max-w-6xl h-[90vh] bg-gray-900 rounded-xl shadow-2xl relative overflow-hidden border border-gray-700">
              <div className="absolute top-4 right-4 z-10">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-colors duration-200"
                  onClick={closeGameBoard}
                  aria-label="Close game"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-full p-4 sm:p-6 lg:p-8 overflow-auto">
                {renderGameBoard()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Games;
