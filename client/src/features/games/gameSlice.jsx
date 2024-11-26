
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameMode: null,
    roomName: "",
    scores: {},
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
   
  },
});

export const {
  setGameMode,
  setRoomName,
  setScores,
  resetScores,
} = gameSlice.actions;

export default gameSlice.reducer;