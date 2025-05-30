import { configureStore } from "@reduxjs/toolkit";
import { stationsSliceReducer } from "@/state/slices.js";

const store = configureStore({
  reducer: {
    stations: stationsSliceReducer,
  },
});

export default store;
