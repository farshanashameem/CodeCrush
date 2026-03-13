import { createSlice } from "@reduxjs/toolkit";

interface Child {
  id: string;
  name: string;
  age: number;
}

interface ParentState {
  children: Child[];
}

const initialState: ParentState = {
  children: [
    {
      id: "1",
      name: "Ayaan",
      age: 5,
    },
    {
      id: "2",
      name: "Sara",
      age: 6,
    },
  ],
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {},
});

export default parentSlice.reducer;