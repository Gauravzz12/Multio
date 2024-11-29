
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameMode: null,
    roomName: "",
    scores: {},
    matchInfo: {rounds:5},

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
      const { rounds } = action.payload;
      console.log(action.payload);
      state.matchInfo.rounds=rounds;
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