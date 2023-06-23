import { createSlice } from "@reduxjs/toolkit";

export type userState = {
  accessToken: string | null;
  user: any;
  namiWalletAddress: string;
};

const initialState: userState = {
  accessToken: null,
  user: null,
  namiWalletAddress: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => initialState,
    saveUserData: (state, action) => {
      state.user = action.payload;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveNamiWalletAddress: (state, action) => {
      state.namiWalletAddress = action.payload;
    },
  },
});

export const {
  saveAccessToken,
  resetUserState,
  saveUserData,
  saveNamiWalletAddress,
} = userSlice.actions;

export default userSlice.reducer;
