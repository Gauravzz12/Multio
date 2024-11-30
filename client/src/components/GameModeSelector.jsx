import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameMode, setRoomName, setMatchInfo } from "../features/games/gameSlice";
import { toast } from "react-toastify";

const GameModeSelector = ({ socket }) => {
  const dispatch = useDispatch();
  const [roomInput, setRoomInput] = useState("");
  const [rounds, setRounds] = useState(5);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode === selectedMode ? null : mode);
  };

  const handleAction = () => {
    if (!roomInput.trim()) return;
    if (selectedMode === 'join') {
      socket.emit("checkRoom", { roomId: roomInput.trim() });
      socket.once("roomStatus", ({ status }) => {
        if (status === "notFound") {
          toast.error("Room does not exist");
        } else if (status === "full") {
          toast.error("Room is full");
        } else if (status === "available") {
          dispatch(setGameMode('custom'));
          dispatch(setRoomName(roomInput.trim()));
          dispatch(setMatchInfo({ rounds }));
        }
      });
    } else if (selectedMode === 'create') {
      dispatch(setGameMode('custom'));
      dispatch(setRoomName(roomInput.trim()));
      dispatch(setMatchInfo({ rounds }));
    }
  };

  const handleOnlinePlay = () => {
    dispatch(setGameMode('online'));
    dispatch(setMatchInfo({ rounds: 3 }));
  };

  return (
    <div className="flex flex-col items-center p-4 mt-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center font-bold 
        bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Select Game Mode
      </h2>
      
      <div className="flex flex-col gap-2 ">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90
            text-white font-bold py-4 px-6 rounded-lg text-lg md:text-xl
            transform hover:scale-105 transition-all duration-300
            shadow-lg hover:shadow-xl"
          onClick={handleOnlinePlay}
        >
          Play Online
        </button>

        <div className="flex gap-2 justify-center ">
          <button
            className={`bg-purple-700
            } hover:opacity-90 text-white font-bold py-3 px-3 rounded-lg text-lg
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            onClick={() => handleModeSelect('join')}
          >
            Join Room
          </button>
          <button
            className={`bg-green-700
            } hover:opacity-90 text-white font-bold py-3 px-3 rounded-lg text-lg
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            onClick={() => handleModeSelect('create')}
          >
            Create Room
          </button>
        </div>

        {selectedMode && (
          <div
            className={`flex flex-col gap-3 bg-gray-800 p-4 rounded-b-lg ${
              selectedMode === 'join' ? 'border-t-4 border-purple-700' : 'border-t-4 border-green-700'
            }`}
          >
            <input
              type="text"
              placeholder={selectedMode === 'create' ? "Enter room name" : "Enter Room ID"}
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              className="p-4 border rounded-lg bg-gray-700 text-white
                focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all duration-300"
            />
            <button
              className={` ${selectedMode==='create'?'bg-green-700':'bg-purple-700'} hover:opacity-90
                text-white font-bold py-3 px-3 rounded-lg text-lg
                transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl`}
              onClick={handleAction}
            >
              {selectedMode === 'create' ? "Create" : "Join"}
            </button>

            {selectedMode === 'create' && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white text-sm">Number of Rounds:</label>
                  <span className="text-purple-400 font-bold">{rounds}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">1</span>
                  <span className="text-xs text-gray-400">10</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModeSelector;