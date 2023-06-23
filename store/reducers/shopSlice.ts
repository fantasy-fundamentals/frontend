import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopDetails: null,
  usdPrice: null,
};

const shopSlice = createSlice({
  name: "shopDetail",
  initialState,
  reducers: {
    saveShopDetails: (state, action) => {
      state.shopDetails = action.payload;
    },
    saveCardanoPrice: (state, action) => {
      state.usdPrice = action.payload;
    },
  },
});
export const { saveShopDetails, saveCardanoPrice } = shopSlice.actions;
export default shopSlice.reducer;
