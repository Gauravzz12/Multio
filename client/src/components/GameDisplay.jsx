import React from "react";
import { useDispatch } from "react-redux";
import rockIcon from "../assets/images/RPS/rock.svg";
import paperIcon from "../assets/images/RPS/paper.svg";
import scissorsIcon from "../assets/images/RPS/scissors.svg";

const choiceIcons = {
  Rock: rockIcon,
  Paper: paperIcon,
  Scissors: scissorsIcon,
};

const GameDisplay = ({ userChoice, opponentChoice, result, onPlayAgain }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex justify-around w-full max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mb-4">You</h2>
          <img src={choiceIcons[userChoice]} alt={userChoice} className="w-32 h-32 animate-pulse" />
          <p className="text-xl mt-2">{userChoice}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mb-4">Opponent</h2>
          <img
            src={choiceIcons[opponentChoice]}
            alt={opponentChoice}
            className="w-32 h-32 animate-pulse"
          />
          <p className="text-xl mt-2">{opponentChoice}</p>
        </div>
      </div>
      {userChoice && opponentChoice && (
        <h1 className={`text-5xl mt-8 font-bold ${result === "You win!" ? "text-green-500" : result === "You lose!" ? "text-red-500" : "text-yellow-500"}`}>
          {result}
        </h1>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-6"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameDisplay;
