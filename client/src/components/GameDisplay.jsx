import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../features/games/rpsSlice";

const GameDisplay = ({ userChoice, opponentChoice, result }) => {
  const dispatch = useDispatch();

  const handlePlayAgain = () => {
    dispatch(resetGame());
  };

  return (
    <div>
      <h1 className="text-5xl">Your choice: {userChoice}</h1>
      <h1 className="text-5xl">Opponent's choice: {opponentChoice}</h1>
      <h1 className="text-5xl">Result: {result}</h1>
      <button
        className="text-4xl text-white mt-8 border-4 border-white"
        onClick={handlePlayAgain}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameDisplay;
