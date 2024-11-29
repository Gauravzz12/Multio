import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const ScoreBoard = ({ socketId }) => { 
  const { scores } = useSelector((state) => state.game); 
  const user = useSelector(selectCurrentUser);
  const playerId = socketId;
  if (!scores || Object.keys(scores).length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl
      shadow-2xl mb-6 w-full max-w-md transform hover:scale-102 transition-all duration-300 ">
      <div className="flex justify-between items-center">
        {[
          { label: user, score: scores[playerId] || 0, color: "green" },
          { label: "Opponent", score: Object.entries(scores).find(([id]) => id !== playerId)?.[1] || 0, color: "red" }
        ].map((player, index) => (
          <div key={index} className="text-center flex-1 px-4">
            <p className={`font-bold text-${player.color}-500 text-lg md:text-xl mb-2`}>
              {player.label}
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white text-transparent bg-clip-text">
              {player.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;