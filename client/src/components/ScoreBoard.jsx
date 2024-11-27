import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const ScoreBoard = ({ socketId }) => { 
  const { scores } = useSelector((state) => state.game); 
  const user = useSelector(selectCurrentUser);
  const playerId = socketId;
  if (!scores || Object.keys(scores).length === 0) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 w-full max-w-md">
      <div className="flex justify-between">
        <div className="text-center">
          <p className="font-bold text-green-500">{user}</p>
          <p className="text-2xl">{scores[playerId] || 0}</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-red-500">Opponent</p>
          <p className="text-2xl">
            {Object.entries(scores).find(([id]) => id !== playerId)?.[1] || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;