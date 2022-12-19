import { configureStore } from "@reduxjs/toolkit";
import breedSlice from "./slices/BreedSlice";

export const store = configureStore({
  reducer: {
    breed: breedSlice,
    combinations: breedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
