import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";

/* ---------- Load from localStorage ---------- */

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("accessToken");

/* ---------- Initial State ---------- */

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedToken ? storedToken : null,
  isAuthenticated: !!storedToken,
};

/* ---------- Slice ---------- */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;

      localStorage.setItem("accessToken", action.payload);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

/* ---------- Exports ---------- */

export const { setCredentials, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;