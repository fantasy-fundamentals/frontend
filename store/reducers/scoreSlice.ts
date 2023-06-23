import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scoreDetails: null,
};

const scoreSlice = createSlice({
  name: "scoreDetail",
  initialState,
  reducers: {
    saveScoreDetails: (state, action) => {
      state.scoreDetails = action.payload;
    },
  },
});
export const { saveScoreDetails } = scoreSlice.actions;
export default scoreSlice.reducer;
