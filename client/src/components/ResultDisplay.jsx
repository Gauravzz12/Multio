
import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ResultDisplay = ({ isOpen, scores, socketId }) => {
  const { matchInfo } = useSelector(state => state.game);

  if (!isOpen) return null;

  const isWinner = scores[socketId] === matchInfo.rounds;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl transform animate-slideIn border-4 border-violet-500">
        <div className="flex flex-col items-center space-y-6">
          <FaTrophy className={`text-6xl ${isWinner ? 'text-yellow-400' : 'text-gray-400'} animate-bounce`} />
          <h2 className={`text-4xl font-bold ${isWinner ? 'text-green-500' : 'text-red-500'}`}>
            {isWinner ? 'You Won!' : 'You Lost!'}
          </h2>
          <p className="text-xl text-gray-300">
            Final Score: {scores[socketId]} - {matchInfo.rounds}
          </p>
          <p className="text-gray-400">Redirecting to games page...</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;