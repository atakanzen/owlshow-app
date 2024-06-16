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
  isSaved: false,
});

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    resetAppSettings: initialState,
    setIsSaved: (state, action: PayloadAction<boolean>) => {
      state.isSaved = action.payload;
    },
    setNumberOfPlayers: (
      state,
      action: PayloadAction<number>
    ) => {
      state.numberOfPlayers = action.payload;
      state.numberOfPlayersError = undefined;
      state.isSaved = false;
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
      state.isSaved = false;
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
      state.isSaved = false;
    },
    setTimePerQuestionError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.timePerQuestionError = action.payload;
    },
    setPointsPerQuestion: (
      state,
      action: PayloadAction<number>
    ) => {
      state.pointsPerQuestion = action.payload;
      state.pointsPerQuestionError = undefined;
      state.isSaved = false;
    },
    setPointsPerQuestionError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.pointsPerQuestionError = action.payload;
    },
    setTimeForSplashScreen: (
      state,
      action: PayloadAction<number>
    ) => {
      state.timeForSplashScreen = action.payload;
      state.timeForSplashScreenError = undefined;
      state.isSaved = false;
    },
    setTimeForSplashScreenError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.timeForSplashScreenError = action.payload;
    },
  },
});

export const {
  resetAppSettings,
  setNumberOfPlayers,
  setNumberOfQuestions,
  setTimePerQuestion,
  setTimePerQuestionError,
  setNumberOfPlayersError,
  setNumberOfQuestionsError,
  setIsSaved,
  setPointsPerQuestion,
  setPointsPerQuestionError,
  setTimeForSplashScreen,
  setTimeForSplashScreenError,
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
