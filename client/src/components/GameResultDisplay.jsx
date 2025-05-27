import React from 'react';
import { FaTrophy, FaMedal, FaCrown, FaFire } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const GameResultDisplay = ({ socket }) => {
  const { matchInfo } = useSelector((state) => state.game);
  const playerId = socket.id;
  const isWinner = playerId === matchInfo.winner;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative">
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                isWinner ? 'bg-yellow-400' : 'bg-blue-400'
              } animate-ping`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-white/20 backdrop-blur-xl">
          <div className="text-center">
            {/* Trophy/Medal Icon */}
            <div
              className={`mx-auto mb-8 p-6 rounded-full ${
                isWinner
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              } animate-bounce shadow-2xl`}
            >
              {isWinner ? (
                <FaTrophy className="w-16 h-16 text-white" />
              ) : (
                <FaMedal className="w-16 h-16 text-white" />
              )}
            </div>

            {/* Crown for winner */}
            {isWinner && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <FaCrown className="w-12 h-12 text-yellow-400 animate-pulse" />
              </div>
            )}

            {/* Main heading */}
            <h2
              className={`text-5xl font-bold mb-4 ${
                isWinner ? 'text-yellow-400' : 'text-blue-400'
              }`}
            >
              {isWinner ? 'Victory!' : 'Good Game!'}
            </h2>

            {/* Result text */}
            <div
              className={`text-2xl font-semibold mb-8 ${
                isWinner ? 'text-yellow-300' : 'text-blue-300'
              }`}
            >
              {isWinner ? (
                <div className="flex items-center justify-center gap-2">
                  <FaFire className="text-orange-400" />
                  <span>You are the Champion!</span>
                  <FaFire className="text-orange-400" />
                </div>
              ) : (
                <span>Better luck next time!</span>
              )}
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    isWinner ? 'bg-yellow-400' : 'bg-blue-400'
                  } animate-pulse`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Auto-redirect message */}
            <p className="text-slate-400 text-sm">
              Returning to games in a moment...
            </p>

            {/* Animated border */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${
                isWinner
                  ? 'from-yellow-400 via-orange-500 to-yellow-400'
                  : 'from-blue-500 via-purple-500 to-blue-500'
              } opacity-20 animate-pulse -z-10`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResultDisplay;