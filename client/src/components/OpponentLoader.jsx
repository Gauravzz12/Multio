import React from "react";
import { FaClock, FaSpinner } from "react-icons/fa";

export const OpponentLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[450px] gap-8 px-4">
      {/* Animated Icon */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-spin">
            <FaSpinner className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
          Finding Your Opponent
        </h1>
        <p className="text-slate-300 text-lg">
          Preparing an epic battle experience...
        </p>
      </div>

      {/* Loading Animation */}
      <div className="flex items-center gap-4">
        <FaClock className="text-purple-400 w-5 h-5" />
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.2s]"></div>
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.4s]"></div>
        </div>
      </div>

      {/* Status Message */}
      <div className="glass rounded-2xl p-6 backdrop-blur-xl border border-white/20 max-w-md text-center">
        <p className="text-slate-300 mb-3">
          Searching for a worthy challenger...
        </p>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default OpponentLoader;
