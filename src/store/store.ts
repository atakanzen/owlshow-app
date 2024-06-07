import { configureStore } from '@reduxjs/toolkit';
import { questionSlice } from './slices/question';

export const store = configureStore({
  reducer: {
    [questionSlice.reducerPath]: questionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
