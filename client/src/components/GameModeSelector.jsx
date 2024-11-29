import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameMode, setRoomName,setMatchInfo} from "../features/games/gameSlice";

const GameModeSelector = () => {
  const dispatch = useDispatch();
  const [roomInput, setRoomInput] = useState("");
  const [rounds, setRounds] = useState(5);
  const handleJoinRoom = () => {
    if (roomInput.trim()) {
      dispatch(setGameMode('custom'));
      dispatch(setRoomName(roomInput.trim()));
      dispatch(setMatchInfo({rounds:rounds}));
    }
  };

  return (
    <div className="flex flex-col items-center p-4 mt-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center font-bold 
        bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Select Game Mode
      </h2>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90
            text-white font-bold py-4 px-6 rounded-lg text-lg md:text-xl
            transform hover:scale-105 transition-all duration-300
            shadow-lg hover:shadow-xl"
            name="online"
          onClick={()=>dispatch(setGameMode('online'))}
        >
          Play Online
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            className="flex-1 p-4 border rounded-lg bg-gray-800 text-white
              focus:ring-2 focus:ring-green-500 focus:border-transparent
              transition-all duration-300"
          />
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90
              text-white font-bold py-4 px-6 rounded-lg text-lg
              transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl whitespace-nowrap"
              name="custom"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>

        <div className="mt-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <label className="text-white text-sm">Number of Rounds:</label>
            <span className="text-purple-400 font-bold">{rounds}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
              "
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">1</span>
            <span className="text-xs text-gray-400">10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;