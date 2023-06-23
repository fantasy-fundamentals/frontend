import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playersDetails: null,
};

const playersSlice = createSlice({
  name: "playersDetail",
  initialState,
  reducers: {
    savePlayerDetails: (state, action) => {
      state.playersDetails = action.payload;
    },
  },
});
export const { savePlayerDetails } = playersSlice.actions;
export default playersSlice.reducer;
