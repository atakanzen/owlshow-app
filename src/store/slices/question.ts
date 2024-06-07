import { Question } from '@/types/question';
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

interface QuestionState {
  questions: Question[];
}

const initialState = (): QuestionState => ({
  questions: [],
});

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    resetQuestions: initialState,
    addQuestion: (state) => {
      state.questions.push({
        id: crypto.randomUUID(),
        answers: [],
        question: '',
        type: 'Single Answer Test',
      });
    },
    removeQuestion: (
      state,
      action: PayloadAction<string>
    ) => {
      state.questions = state.questions.filter(
        (q) => q.id !== action.payload
      );
    },
  },
});

export const {
  addQuestion,
  removeQuestion,
  resetQuestions,
} = questionSlice.actions;

export const selectQuestions = (state: RootState) =>
  state.question.questions;

export default questionSlice.reducer;
