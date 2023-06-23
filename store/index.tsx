import { combineReducers, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import {
  Action,
  configureStore,
  ThunkAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";
import userSlice from "./reducers/user";
import playersSlice from "./reducers/playersSlice";
import blogSlice from "./reducers/blogSlice";
import homeSlice from "./reducers/homeSlice";
import scoreSlice from "./reducers/scoreSlice";
import shopSlice from "./reducers/shopSlice";
import nftSlice from "./reducers/nftSlice";
import newsSlice from "./reducers/newsSlice";
import settingsSlice from "./reducers/settingsSlice";
import privacyPolicySlice from "./reducers/privacyPolicySlice";
import timerSlice from "./reducers/timerSlice";
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "user",
    "playersDetail",
    "blogDetail",
    "home",
    "scoreDetail",
    "shopDetail",
    "nftDetail",
    "timer",
    "newsDetail",
    "settingsData",
    "privacyPolicy",
    "timerSlice",
  ],
  blacklist: [],
  transforms: [],
};

const reducers = combineReducers({
  user: userSlice,
  playersDetail: playersSlice,
  blogDetail: blogSlice,
  home: homeSlice,
  scoreDetail: scoreSlice,
  shopDetail: shopSlice,
  nftDetail: nftSlice,
  newsDetail: newsSlice,
  settingsData: settingsSlice,
  privacyPolicy: privacyPolicySlice,
  timer: timerSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
}).concat(ReduxThunk);

let enhancedCompose = compose;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancedCompose(middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
