import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogDetails: null,
};

const blogSlice = createSlice({
  name: "blogDetail",
  initialState,
  reducers: {
    saveBlogDetails: (state, action) => {
      state.blogDetails = action.payload;
    },
  },
});
export const { saveBlogDetails } = blogSlice.actions;
export default blogSlice.reducer;
