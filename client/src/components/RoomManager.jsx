import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRoomName } from "../features/games/rpsSlice";

const RoomManager = ({ socket }) => {
  const dispatch = useDispatch();
  const [roomInput, setRoomInput] = useState("");

  const createRoom = () => {
    const generatedRoomId = "room_" + Math.random().toString(36).substr(2, 9);
    dispatch(setRoomName(generatedRoomId));
    // Share this room ID with friends
  };

  const joinRoom = () => {
    if (roomInput.trim()) {
      dispatch(setRoomName(roomInput.trim()));
    }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-2 items-center">
        <button
          className="bg-blue-500 w-48 h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={createRoom}
        >
          Create Room
        </button>
        <input
          type="text"
          placeholder="Enter Room ID"
          className="mb-2 p-2 border rounded w-48 h-12 text-black"
          onChange={(e) => setRoomInput(e.target.value)}
        />
        <button
          className="bg-green-500 w-48 h-12 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomManager;
