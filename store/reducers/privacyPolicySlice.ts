import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privacyPolicy: null,
};

const privacyPolicySlice = createSlice({
  name: "privacyPolicy",
  initialState,
  reducers: {
    savePrivacyPolicy: (state, action) => {
      state.privacyPolicy = action.payload;
    },
  },
});
export const { savePrivacyPolicy } = privacyPolicySlice.actions;
export default privacyPolicySlice.reducer;
