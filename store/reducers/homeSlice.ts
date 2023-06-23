import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestNews: [],
  blog: [],
  shop: [],
  player: [],
  topHeading: [],
  score: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    savelatestNews: (state, action) => {
      state.latestNews = action.payload;
    },
    saveblog: (state, action) => {
      state.blog = action.payload;
    },
    saveShopData: (state, action) => {
      state.shop = action.payload;
    },
    savePlayer: (state, action) => {
      state.player = action.payload;
    },
    saveTopHeading: (state, action) => {
      state.topHeading = action.payload;
    },
    saveScoreData: (state, action) => {
      state.score = action.payload;
    },
    toggleIsFavorite: (state, action) => {
      const playerId = action.payload;
      state.player = state.player.map((playerData) => {
        if (playerData._id == playerId) {
          return {
            ...playerData,
            isFavorite: !playerData.isFavorite,
          };
        } else {
          return playerData;
        }
      });
    },
  },
});
export const {
  savelatestNews,
  saveblog,
  saveShopData,
  savePlayer,
  saveScoreData,
  saveTopHeading,
  toggleIsFavorite,
} = homeSlice.actions;
export default homeSlice.reducer;
