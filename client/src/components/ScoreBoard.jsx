import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentAvatar } from '../features/auth/authSlice';
import defaultAvatar from '../assets/images/default-avatar.png';
const ScoreBoard = ({ socketId }) => {
  const { scores, matchInfo } = useSelector((state) => state.game);
  const user = useSelector(selectCurrentUser);
  const userAvatar = useSelector(selectCurrentAvatar)==='Guest'?defaultAvatar:useSelector(selectCurrentAvatar);
  const playerId = socketId;
  if (!scores || Object.keys(scores).length === 0) return null;
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl
      shadow-2xl mb-6 w-full max-w-md transform hover:scale-102 transition-all duration-300">
      <div className="flex justify-between items-center">
        {[
          { label: user, score: scores[playerId] || 0, color: "green", avatar: userAvatar },
          { label: "Opponent", score: Object.entries(scores).find(([id]) => id !== playerId)?.[1] || 0, color: "red", avatar: defaultAvatar }
        ].map((player, index) => (
          <div key={index} className="text-center flex-1 px-4">
            <div className="mb-3">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-${player.color}-500 overflow-hidden
                shadow-lg transform transition-transform duration-300 hover:scale-110">
                <img 
                  src={player.avatar} 
                  alt={player.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className={`font-bold text-${player.color}-500 text-lg md:text-xl mb-2`}>
              {player.label}
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white text-transparent bg-clip-text">
              {player.score}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <span className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 
          hover:to-gray-500 text-white px-6 py-3 rounded-lg font-medium tracking-wide
          transform transition-all duration-300 hover:shadow-lg">
          First to {matchInfo.rounds} wins!
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;