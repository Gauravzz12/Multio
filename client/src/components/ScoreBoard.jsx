import React from 'react';
import { useSelector } from 'react-redux';
import defaultAvatar from '../assets/images/default-avatar.png';

const PlayerCard = ({ name, score, color, avatar }) => (
  <div className="text-center flex-1 px-2">
    <div className="mb-2">
      <div className={`w-12 h-12 mx-auto rounded-full border-2 border-${color}-500 overflow-hidden
           shadow-lg transform transition-transform duration-300 hover:scale-110`}>
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
    <p className={`font-bold text-${color}-500 text-sm md:text-base mb-1`}>
      {name}
    </p>
    <p className="text-2xl md:text-3xl font-bold text-white text-transparent bg-clip-text">
      {score}
    </p>
  </div>
);

const ScoreBoard = React.memo(({ socketId }) => {
  const { scores = {}, matchInfo = {} } = useSelector((state) => state.game);
  const playersInfo = matchInfo?.playersInfo || {};
  
  if (!socketId || !playersInfo || Object.keys(playersInfo).length < 2) {
    return null;
  }

  const currentPlayer = playersInfo[socketId];
  const opponent = Object.values(playersInfo).find(player => player?.socketID !== socketId);
  console.log("player", currentPlayer);
  console.log("opponent", opponent);
  if (!currentPlayer || !opponent) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl
      shadow-2xl mb-4 w-full max-w-sm transform hover:scale-102 transition-all duration-300">
      <div className="flex justify-between items-center">
        <PlayerCard
          name={currentPlayer.userName || 'Player'}
          score={scores[socketId] || 0}
          color="green"
          avatar={currentPlayer.userAvatar || defaultAvatar}
        />
        <PlayerCard
          name={opponent.userName || 'Opponent'}
          score={scores[opponent.socketID] || 0}
          color="red"
          avatar={opponent.userAvatar || defaultAvatar}
        />
      </div>
      <div className="flex justify-center mt-3">
        <span className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 
          hover:to-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide
          transform transition-all duration-300 hover:shadow-lg">
          First to {matchInfo.rounds || 0} wins!
        </span>
      </div>
    </div>
  );
});

export default ScoreBoard;