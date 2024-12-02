import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import defaultAvatar from '../assets/images/default-avatar.png';

const ScoreBoard = React.memo(({ socketId }) => {
  const { scores, matchInfo } = useSelector((state) => state.game);

  const playersArray = matchInfo?.playersInfo ? Object.values(matchInfo.playersInfo) : [];
  const userInfo = playersArray.find(player => player.socketID === socketId) || { userName: 'User', userAvatar: defaultAvatar };
  const opponentInfo = playersArray.find(player => player.socketID !== socketId) || { userName: 'Opponent', userAvatar: defaultAvatar };
  const playerId = socketId;

  
  if (!scores || Object.keys(scores).length === 0) return null;
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl
      shadow-2xl mb-4 w-full max-w-sm transform hover:scale-102 transition-all duration-300">
      <div className="flex justify-between items-center">
        {[
          { label: userInfo.userName, score: scores[playerId] || 0, color: "green", avatar: userInfo.userAvatar || defaultAvatar },
          { label: opponentInfo.userName, score: Object.entries(scores).find(([id]) => id !== playerId)?.[1] || 0, color: "red", avatar: opponentInfo.userAvatar || defaultAvatar }
        ].map((player, index) => (
          <div key={index} className="text-center flex-1 px-2">
            <div className="mb-2">
              <div className="w-12 h-12 mx-auto rounded-full border-2 border-${player.color}-500 overflow-hidden
                shadow-lg transform transition-transform duration-300 hover:scale-110">
                <img 
                  src={player.avatar} 
                  alt={player.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className={`font-bold text-${player.color}-500 text-sm md:text-base mb-1`}>
              {player.label}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white text-transparent bg-clip-text">
              {player.score}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <span className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 
          hover:to-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide
          transform transition-all duration-300 hover:shadow-lg">
          First to {matchInfo.rounds} wins!
        </span>
      </div>
    </div>
  );
});

export default ScoreBoard;