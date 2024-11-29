
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaMedal } from 'react-icons/fa';

const GameResultDisplay = ({ winner, scores, playAgain }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center gap-6">
          <FaTrophy className="text-6xl text-yellow-400 animate-bounce" />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
            Game Over!
          </h2>

          <div className="w-full space-y-4">
            {Object.entries(scores).map(([playerId, score]) => (
              <div 
                key={playerId}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  playerId === winner 
                    ? 'bg-green-500/20 border border-green-500' 
                    : 'bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {playerId === winner && <FaMedal className="text-yellow-400" />}
                  <span className="font-semibold">
                    {playerId === winner ? 'Winner' : 'Player'}
                  </span>
                </div>
                <span className="text-xl font-bold">{score}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 w-full mt-4">
            <button
              onClick={playAgain}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/Games')}
              className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResultDisplay;