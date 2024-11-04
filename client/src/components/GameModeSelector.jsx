import React from "react";
import { useDispatch } from "react-redux";
import { setGameMode } from "../features/games/rpsSlice";

const GameModeSelector = () => {
  const dispatch = useDispatch();
  return (
    <div className="mb-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => dispatch(setGameMode("online"))}
      >
        Play Online
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch(setGameMode("friends"))}
      >
        Play with Friends
      </button>
    </div>
  );
};

export default GameModeSelector;
