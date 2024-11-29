
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameMode: null,
    roomName: "",
    scores: {},
    matchInfo: {},
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
      state.matchInfo = action.payload;
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
} = gameSlice.actions;

export default gameSlice.reducer;