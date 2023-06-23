import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsDetails: null,
};

const newsSlice = createSlice({
  name: "newsDetail",
  initialState,
  reducers: {
    saveNewsDetails: (state, action) => {
      state.newsDetails = action.payload;
    },
  },
});
export const { saveNewsDetails } = newsSlice.actions;
export default newsSlice.reducer;
