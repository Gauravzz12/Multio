import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        {/* Main spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent text-purple-400 text-4xl animate-spin flex items-center justify-center border-t-purple-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-pink-400 text-2xl animate-spin flex items-center justify-center border-t-pink-400 rounded-full">
              <div className="w-12 h-12 border-4 border-transparent text-indigo-400 text-xl animate-spin flex items-center justify-center border-t-indigo-400 rounded-full">
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Loading Multio
          </h2>
          
          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.4s]"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 bg-slate-800 rounded-full h-2 mt-6">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
