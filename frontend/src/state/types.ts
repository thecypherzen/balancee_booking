import store from "@/state/store.js";

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export type { AppDispatch, RootState };
