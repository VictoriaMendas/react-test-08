import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshAuth, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = { email: null, password: null };
        state.token = null;
      })
      .addCase(refreshAuth.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshAuth.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});
export const authReducer = authSlice.reducer;
