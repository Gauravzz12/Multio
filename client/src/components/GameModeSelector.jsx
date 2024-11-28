import React from "react";
import { useDispatch } from "react-redux";
import { setGameMode } from "../features/games/gameSlice";

const GameModeSelector = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="flex flex-col items-center p-4 mt-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center font-bold 
        bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Select Game Mode
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
        {[
          { mode: "online", text: "Play Online", color: "from-blue-500 to-blue-700" },
          { mode: "friends", text: "Play with Friends", color: "from-green-500 to-green-700" }
        ].map((btn, index) => (
          <button
            key={index}
            className={`flex-1 bg-gradient-to-r ${btn.color} hover:opacity-90
              text-white font-bold py-4 px-6 rounded-lg text-lg md:text-xl
              transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl`}
            onClick={() => dispatch(setGameMode(btn.mode))}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;
