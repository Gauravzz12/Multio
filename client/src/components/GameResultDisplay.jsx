import React from 'react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const GameResultDisplay = ({socket}) => {
  const { matchInfo } = useSelector(state => state.game);
  const playerId=socket.id;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-700 transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col items-center gap-8">
          <FaTrophy className="text-7xl text-yellow-400 animate-bounce shadow-lg" />
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-transparent bg-clip-text tracking-wider">
            Game Over!
          </h2>

          <div className="w-full space-y-6">
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
              {playerId === matchInfo.winner && <FaMedal className="text-yellow-400 text-2xl animate-pulse" />}
              <span className="font-bold text-xl text-gray-100">
                {playerId === matchInfo.winner ? 'Winner!' : 'Better luck next time!'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResultDisplay;