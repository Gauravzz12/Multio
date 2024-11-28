import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomName } from "../features/games/gameSlice";
import { FaCopy } from "react-icons/fa";

const RoomManager = () => {
  const dispatch = useDispatch();
  const [roomInput, setRoomInput] = useState("");
  const roomName = useSelector((state) => state.game.roomName);

  const createRoom = () => {
    const generatedRoomId = "room_" + Math.random().toString(36).substr(2, 9);
    dispatch(setRoomName(generatedRoomId));
  };

  const joinRoom = () => {
    if (roomInput.trim()) {
      dispatch(setRoomName(roomInput.trim()));
      socket.emit("joinExistingRoom", { roomId: roomInput.trim() });
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomName);
  };

  return (
    <div className="mt-8 md:mt-12 flex flex-col items-center p-4">
      {!roomName ? (
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <button
            className="w-full md:w-64 h-12 bg-gradient-to-r from-blue-500 to-blue-700
              hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4
              rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={createRoom}
          >
            Create Room
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <input
              type="text"
              placeholder="Enter Room ID"
              className="w-full sm:flex-1 p-3 border rounded-lg bg-gray-800 text-white
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                transition-all duration-300"
              onChange={(e) => setRoomInput(e.target.value)}
            />
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700
                hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-6
                rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-xl">
          <p className="text-xl md:text-2xl mb-4">Room ID: <span className="text-purple-400">{roomName}</span></p>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600
              hover:from-gray-600 hover:to-gray-500 text-white font-bold py-2 px-4
              rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={copyRoomId}
          >
            <FaCopy /> Copy Room ID
          </button>
          <p className="mt-6 text-lg text-purple-300 animate-pulse">
            Waiting for an opponent to join...
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomManager;
