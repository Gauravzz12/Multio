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
    <div className="mt-12 flex flex-col items-center">
      {!roomName ? (
        <>
          <div className="flex flex-col gap-4 items-center">
            <button
              className="bg-blue-500 w-48 h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={createRoom}
            >
              Create Room
            </button>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Room ID"
                className="p-2 border rounded w-64 text-black"
                onChange={(e) => setRoomInput(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={joinRoom}
              >
                Join Room
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-4">Room ID: {roomName}</p>
          <button
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={copyRoomId}
          >
            <FaCopy className="mr-2" /> Copy Room ID
          </button>
          <p className="mt-4 text-lg">Waiting for an opponent to join...</p>
        </div>
      )}
    </div>
  );
};

export default RoomManager;
