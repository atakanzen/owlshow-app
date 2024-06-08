import { AppSettings } from '@/types/appsettings';
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

type AppSettingsState = AppSettings;

const initialState = (): AppSettingsState => ({
  numberOfPlayers: 1,
  numberOfQuestions: 1,
  pointsPerQuestion: 5,
  timeForSplashScreen: 2,
  timePerQuestion: 10,
});

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    resetAppSettings: initialState,
    setNumberOfPlayers: (
      state,
      action: PayloadAction<number>
    ) => {
      state.numberOfPlayers = action.payload;
      state.numberOfPlayersError = undefined;
    },
    setNumberOfPlayersError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.numberOfPlayersError = action.payload;
    },
    setNumberOfQuestions: (
      state,
      action: PayloadAction<number>
    ) => {
      state.numberOfQuestions = action.payload;
      state.numberOfQuestionsError = undefined;
    },
    setNumberOfQuestionsError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.numberOfQuestionsError = action.payload;
    },
    setTimePerQuestion: (
      state,
      action: PayloadAction<number>
    ) => {
      state.timePerQuestion = action.payload;
      state.timePerQuestionError = undefined;
    },
    setTimePerQuestionError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.timePerQuestionError = action.payload;
    },
  },
});

export const {
  resetAppSettings,
  setNumberOfPlayers,
  setNumberOfQuestions,
  setTimePerQuestion,
  setNumberOfPlayersError,
  setNumberOfQuestionsError,
  setTimePerQuestionError,
} = appSettingsSlice.actions;

export const selectAppSettings = (state: RootState) =>
  state.appSettings;

export const selectAppSettingsError = (
  state: RootState
) => ({
  numberOfPlayersError:
    state.appSettings.numberOfPlayersError,
  numberOfQuestionsError:
    state.appSettings.numberOfQuestionsError,
  timePerQuestionError:
    state.appSettings.timePerQuestionError,
});

export default appSettingsSlice.reducer;
