import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameMode, setRoomName } from "../features/games/gameSlice";

const GameModeSelector = () => {
  const dispatch = useDispatch();
  const [roomInput, setRoomInput] = useState("");

  const handleJoinRoom = () => {
    if (roomInput.trim()) {
      dispatch(setGameMode("custom"));
      dispatch(setRoomName(roomInput.trim()));
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
          onClick={() => dispatch(setGameMode("online"))}
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
            onClick={handleJoinRoom}
          >
            Join Custom Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;