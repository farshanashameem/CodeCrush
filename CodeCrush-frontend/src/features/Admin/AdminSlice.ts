import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Admin, ParentUser, AdminState } from "./types";

const storedAdmin = localStorage.getItem("admin");
const storedToken = localStorage.getItem("adminAccessToken");

const initialState: AdminState = {
  admin: storedAdmin ? JSON.parse(storedAdmin) : null,
  users: [],
  accessToken: storedToken ? storedToken : null,
  isAuthenticated: !!storedToken
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {

    setAdminCredentials: (
      state,
      action: PayloadAction<{ admin: Admin; accessToken: string }>
    ) => {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      localStorage.setItem("adminAccessToken", action.payload.accessToken);
    },

    setUsers: (state, action: PayloadAction<ParentUser[]>) => {
      state.users = action.payload;
    },

    adminLogout: (state) => {
      state.admin = null;
      state.accessToken = null;
      state.users = [];
      state.isAuthenticated = false;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminAccessToken");
    },

    //  update token only
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      

      localStorage.setItem("adminAccessToken", action.payload);
    },

  },
});

export const {
  setAdminCredentials,
  setUsers,
  adminLogout,
  refreshAccessToken, 
} = adminSlice.actions;

export default adminSlice.reducer;