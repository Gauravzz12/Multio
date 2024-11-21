import { createSlice } from "@reduxjs/toolkit";

const rpsSlice = createSlice({
  name: "rps",
  initialState: {
    result: null,
    gameMode: null,
    roomName: "",
    opponentChoice: null,
    scores: {},
  },
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setOpponentChoice: (state, action) => {
      state.opponentChoice = action.payload;
    },
    resetGame: (state) => {
      state.result = null;
      state.opponentChoice = null;
    },
    setScores: (state, action) => {
      state.scores = action.payload;
    },
    resetScores: (state) => {
      state.scores = {};
    },
    setOpponentDisconnected: (state) => {
      state.result = null;
      state.opponentChoice = null;
      state.gameMode = null;
      state.roomName = "";
    },
  },
});

export const {
  setResult,
  setGameMode,
  setRoomName,
  setOpponentChoice,
  resetGame,
  setOpponentDisconnected,
  setScores,
  resetScores,
} = rpsSlice.actions;

export default rpsSlice.reducer;
