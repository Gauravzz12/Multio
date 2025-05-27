import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameMode, setRoomName, setMatchInfo } from "../features/games/gameSlice";
import { toast } from "react-toastify";
import { FaGamepad, FaPlus, FaUsers, FaRocket, FaCog } from "react-icons/fa";

const GameModeSelector = ({ socket }) => {
  const dispatch = useDispatch();
  const [roomInput, setRoomInput] = useState("");
  const [rounds, setRounds] = useState(5);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleAction = () => {
    if (!roomInput.trim()) return;
    socket.emit("checkRoom", { roomId: roomInput.trim() });
    socket.once("roomStatus", ({ status: roomStatus }) => {
      if (selectedMode === 'join') {
        if (roomStatus === "notFound") {
          toast.error("Room does not exist");
        } else if (roomStatus === "full") {
          toast.error("Room is full");
        } else if (roomStatus === "available") {
          dispatch(setGameMode('custom'));
          dispatch(setRoomName(roomInput.trim()));
          dispatch(setMatchInfo({ rounds })); 
        }
      } else if (selectedMode === 'create') {
        if (roomStatus === "available") {
          toast.error("Room already exists");
          return;
        }
        dispatch(setGameMode('custom'));
        dispatch(setRoomName(roomInput.trim()));
        dispatch(setMatchInfo({ rounds })); 
      }
    });
  };

  const handleOnlinePlay = () => {
    dispatch(setGameMode('online'));
    dispatch(setMatchInfo({ rounds: 3 })); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
            <FaGamepad className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Choose Your Battle
        </h2>
        <p className="text-slate-300 text-lg max-w-md mx-auto">
          Select how you want to challenge opponents and prove your skills
        </p>
      </div>

      {/* Game Modes */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Quick Play */}
        <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105">
          <div className="flex items-center gap-6 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <FaRocket className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Quick Match</h3>
              <p className="text-slate-400">Jump into instant action with random opponents</p>
            </div>
          </div>
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            onClick={handleOnlinePlay}
          >
            <div className="flex items-center justify-center gap-3">
              <FaRocket className="w-5 h-5" />
              <span>Start Quick Match</span>
            </div>
          </button>
        </div>

        {/* Custom Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Join Room */}
          <div 
            className={`glass rounded-3xl p-6 backdrop-blur-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
              selectedMode === 'join' 
                ? 'border-purple-400 bg-purple-500/10' 
                : 'border-white/20 hover:border-purple-400/50'
            }`}
            onClick={() => handleModeSelect('join')}
          >
            <div className="text-center mb-4">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl inline-block mb-4">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Join Room</h3>
              <p className="text-slate-400 text-sm">Enter an existing room code</p>
            </div>
          </div>

          {/* Create Room */}
          <div 
            className={`glass rounded-3xl p-6 backdrop-blur-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
              selectedMode === 'create' 
                ? 'border-green-400 bg-green-500/10' 
                : 'border-white/20 hover:border-green-400/50'
            }`}
            onClick={() => handleModeSelect('create')}
          >
            <div className="text-center mb-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl inline-block mb-4">
                <FaPlus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Create Room</h3>
              <p className="text-slate-400 text-sm">Set up your own private room</p>
            </div>
          </div>
        </div>

        {/* Room Configuration */}
        {selectedMode && (
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-white/20 animate-in slide-in-from-bottom duration-500">
            <div className={`border-l-4 pl-6 mb-6 ${
              selectedMode === 'join' ? 'border-purple-400' : 'border-green-400'
            }`}>
              <h4 className="text-xl font-bold text-white mb-2">
                {selectedMode === 'create' ? 'Room Setup' : 'Join Existing Room'}
              </h4>
              <p className="text-slate-400">
                {selectedMode === 'create' 
                  ? 'Configure your room settings and invite friends'
                  : 'Enter the room code shared by your friend'
                }
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  {selectedMode === 'create' ? 'Room Name' : 'Room Code'}
                </label>
                <input
                  type="text"
                  placeholder={selectedMode === 'create' ? "Enter room name" : "Enter room code"}
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {selectedMode === 'create' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FaCog className="text-slate-400" />
                    <label className="text-sm font-medium text-slate-300">
                      Number of Rounds: <span className="text-purple-400 font-bold">{rounds}</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={rounds}
                      onChange={(e) => setRounds(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(rounds-1)*11.11}%, #475569 ${(rounds-1)*11.11}%, #475569 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-slate-500">1</span>
                      <span className="text-xs text-slate-500">10</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                className={`w-full font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ${
                  selectedMode === 'create' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                }`}
                onClick={handleAction}
                disabled={!roomInput.trim()}
              >
                <div className="flex items-center justify-center gap-3">
                  {selectedMode === 'create' ? <FaPlus className="w-5 h-5" /> : <FaUsers className="w-5 h-5" />}
                  <span>{selectedMode === 'create' ? "Create Room" : "Join Room"}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModeSelector;