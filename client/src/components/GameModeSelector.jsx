import React from "react";
import { useDispatch } from "react-redux";
import { setGameMode } from "../features/games/rpsSlice";

const GameModeSelector = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-3xl mb-6">Select Game Mode</h2>
      <div className="flex gap-6">
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-xl"
          onClick={() => dispatch(setGameMode("online"))}
        >
          Play Online
        </button>
        <button
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl"
          onClick={() => dispatch(setGameMode("friends"))}
        >
          Play with Friends
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;
