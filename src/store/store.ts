import { configureStore } from '@reduxjs/toolkit';
import { questionSlice } from './slices/question';
import { appSettingsSlice } from './slices/appsettings';
import { playersSlice } from './slices/player';

export const store = configureStore({
  reducer: {
    [questionSlice.reducerPath]: questionSlice.reducer,
    [appSettingsSlice.reducerPath]:
      appSettingsSlice.reducer,
    [playersSlice.reducerPath]: playersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
