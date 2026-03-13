import { createSlice } from "@reduxjs/toolkit";

interface Activity {
  id: string;
  name: string;
}

interface ChildState {
  activities: Activity[];
}

const initialState: ChildState = {
  activities: [
    {
      id: "1",
      name: "Draw a straight line",
    },
    {
      id: "2",
      name: "Draw a circle",
    },
  ],
};

const childSlice = createSlice({
  name: "child",
  initialState,
  reducers: {},
});

export default childSlice.reducer;