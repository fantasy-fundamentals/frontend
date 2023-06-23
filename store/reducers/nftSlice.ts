import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nftDetails: null,
};

const nftSlice = createSlice({
  name: "nftDetail",
  initialState,
  reducers: {
    saveNftDetails: (state, action) => {
      state.nftDetails = action.payload;
    },
  },
});
export const { saveNftDetails } = nftSlice.actions;
export default nftSlice.reducer;
