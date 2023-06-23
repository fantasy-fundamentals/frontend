import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  settingsData: null,
  maintenance: false,
};

const settingsSlice = createSlice({
  name: "settingsData",
  initialState,
  reducers: {
    saveSettingsData: (state, action) => {
      state.settingsData = action.payload;
    },
  },
});
export const { saveSettingsData } = settingsSlice.actions;
export default settingsSlice.reducer;
