// client/src/features/games/gamesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    currentRoom: null,
    users: [],
    gameResult: null,
  },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload.roomId;
      state.users = action.payload.users;
    },
    setGameResult: (state, action) => {
      state.gameResult = action.payload;
    },
  },
});

export const { setCurrentRoom, setGameResult } = gamesSlice.actions;

export const selectCurrentRoom = (state) => state.games.currentRoom;
export const selectGameResult = (state) => state.games.gameResult;

export default gamesSlice.reducer;
