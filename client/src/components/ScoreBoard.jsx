import React from 'react';
import { useSelector } from 'react-redux';
import defaultAvatar from '../assets/images/default-avatar.png';
import { FaTrophy, FaFire, FaStar } from 'react-icons/fa';

const PlayerCard = ({ name, score, color, avatar, isLeading }) => (
  <div className="text-center flex-1 px-2 relative">
    {/* Leading indicator */}
    {isLeading && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
          <FaStar className="w-4 h-4 text-white" />
        </div>
      </div>
    )}
    
    <div className="mb-2">
      <div className={`w-16 h-16 mx-auto rounded-full border-4 overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-110 relative
           ${color === 'green' ? 'border-green-400' : 'border-red-400'}`}>
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
        {/* Glow effect for leading player */}
        {isLeading && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
    <p className={`font-bold text-base mb-2 ${
      color === 'green' ? 'text-green-400' : 'text-red-400'
    }`}>
      {name}
    </p>
    <div className="relative">
      <p className="text-3xl font-bold text-white bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-2 border border-slate-600">
        {score}
      </p>
      {/* Score animation */}
      {isLeading && (
        <div className="absolute -top-1 -right-1">
          <FaFire className="w-4 h-4 text-orange-400 animate-bounce" />
        </div>
      )}
    </div>
  </div>
);

const ScoreBoard = React.memo(({ socket }) => {
  const socketId = socket.id;
  const { scores = {}, matchInfo = {} } = useSelector(state => state.game);
  const playersInfo = matchInfo?.playersInfo || {};
  
  if (!socketId || !playersInfo || Object.keys(playersInfo).length < 2) {
    return null;
  }

  const user = playersInfo[socketId];
  const opponent = Object.values(playersInfo).find(player => player?.socketID !== socketId);
  
  if (!user || !opponent) {
    return null;
  }

  const userScore = scores[socketId] || 0;
  const opponentScore = scores[opponent.socketID] || 0;
  const isUserLeading = userScore > opponentScore;
  const isOpponentLeading = opponentScore > userScore;

  return (
    <div className="glass backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl mb-6 w-full max-w-lg transform hover:scale-102 transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FaTrophy className="text-yellow-400 w-5 h-5" />
          <h3 className="text-lg font-bold text-white">Battle Arena</h3>
        </div>
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full"></div>
      </div>

      {/* Players */}
      <div className="flex justify-between items-center mb-6">
        <PlayerCard
          name={user.userName || 'You'}
          score={userScore}
          color="green"
          avatar={user.userAvatar || defaultAvatar}
          isLeading={isUserLeading}
        />
        
        {/* VS Divider */}
        <div className="flex flex-col items-center mx-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
            <span className="text-white font-bold text-lg">VS</span>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-pink-500"></div>
        </div>
        
        <PlayerCard
          name={opponent.userName || 'Opponent'}
          score={opponentScore}
          color="red"
          avatar={opponent.userAvatar || defaultAvatar}
          isLeading={isOpponentLeading}
        />
      </div>

      {/* Match Info */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaFire className="text-orange-400 w-4 h-4" />
            <span className="text-white font-semibold">Race to Victory</span>
          </div>
          <p className="text-slate-300 text-sm">
            First to <span className="text-purple-400 font-bold">{matchInfo.rounds || 5}</span> wins takes the crown!
          </p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Progress</span>
          <span>{Math.max(userScore, opponentScore)}/{matchInfo.rounds || 5}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(userScore, opponentScore) / (matchInfo.rounds || 5) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default ScoreBoard;