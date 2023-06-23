import React from "react";
import { toast } from "react-toastify";
import { store } from "../../store";
import { resetTimer, stopTimer } from "../../store/reducers/timerSlice";

const Timer = () => {
  const state = store.getState().timer;
  const minutes = Math.floor(state.duration / 60);
  const seconds = (state.duration % 60).toString().padStart(2, "0");

  if (state.running) {
    toast.info(
      `Please wait ${minutes} minutes & ${seconds} seconds for next transaction`
    );
  } else {
    store.dispatch(stopTimer());
  }
};

export default Timer;
