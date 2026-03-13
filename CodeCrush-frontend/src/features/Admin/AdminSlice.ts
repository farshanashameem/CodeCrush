import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  role: string;
}

interface AdminState {
  users: User[];
}

const initialState: AdminState = {
  users: [
    {
      id: "1",
      name: "Parent User",
      role: "parent",
    },
    {
      id: "2",
      name: "Admin User",
      role: "admin",
    },
  ],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export default adminSlice.reducer;