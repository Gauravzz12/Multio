import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, avatar: null },
  reducers: {
    logIn: (state, action) => {
      const { user, accessToken, avatar } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.avatar = avatar;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.avatar = null;
    },
    guest: (state) => {
      state.user = "Guest";
      state.token = "Guest";
      state.avatar = "Guest";
    },
  },
});

export const { logIn, logOut, guest } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAvatar = (state) => state.auth.avatar;
