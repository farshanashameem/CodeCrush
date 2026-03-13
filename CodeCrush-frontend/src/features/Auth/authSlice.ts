import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: "parent" | "admin";
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: "1",
    name: "Test Parent",
    email: "parent@test.com",
    role: "parent",
  },
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;