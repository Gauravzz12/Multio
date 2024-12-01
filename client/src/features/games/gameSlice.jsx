
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameMode: null,
    roomName: "",
    scores: {},
    matchInfo: {rounds:null,winner:null,loser:null,playersInfo:null},

  },
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setScores: (state, action) => {
      state.scores = action.payload;
    },
    resetScores: (state) => {
      state.scores = {};
    },
    setMatchInfo: (state, action) => {
      const { rounds,winner,loser,playersInfo } = action.payload;
      state.matchInfo.rounds=rounds;
      state.matchInfo.winner=winner;
      state.matchInfo.loser=loser;
      state.matchInfo.playersInfo=playersInfo;
    },
    resetMatchInfo: (state) => {
      state.matchInfo = {};
    },
  },
});

export const {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
  setMatchInfo,
  resetMatchInfo,
} = gameSlice.actions;

export default gameSlice.reducer;