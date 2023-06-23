import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  duration: 0,
  running: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer(state) {
      state.running = true;
      state.duration = 3 * 60;
    },
    stopTimer(state) {
      state.running = false;
      state.duration = 0;
    },
    resetTimer(state) {
      state.duration = 0;
      state.running = false;
    },
    tickTimer(state) {
      state.duration -= 1;
      if (state.duration <= 1) {
        state.running = false;
        state.duration = 0;
      }
    },
  },
});
export const { startTimer, stopTimer, resetTimer, tickTimer } =
  timerSlice.actions;
export default timerSlice.reducer;
