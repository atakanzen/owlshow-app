import {
  Answer,
  Question,
  QuestionTypeEnum,
} from '@/types/question';
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { number } from 'zod';

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
    addAnswerToQuestion: (
      state,
      action: PayloadAction<{
        questionId: string;
      }>
    ) => {
      const { questionId } = action.payload;
      state.questions.map((q) => {
        if (q.id === questionId) {
          const answer: Answer = {
            id: crypto.randomUUID(),
            answer: '',
            correct: false,
          };
          q.answers.push(answer);
          q.numberOfAnswersError = undefined;
        }
        return q;
      });
    },
    setQuestionError: (
      state,
      action: PayloadAction<{
        questionIndex: number;
        errorMessage: string;
      }>
    ) => {
      const { questionIndex, errorMessage } =
        action.payload;
      state.questions[questionIndex].titleError =
        errorMessage;
    },
    setQuestionType: (
      state,
      action: PayloadAction<{
        questionId: string;
        type: QuestionTypeEnum;
      }>
    ) => {
      const { questionId, type } = action.payload;
      state.questions.map((q) => {
        if (q.id === questionId) {
          q.type = type;
          q.numberOfCorrectAnswersError = undefined;
        }
        return q;
      });
    },
    setNumberOfCorrectAnswersError: (
      state,
      action: PayloadAction<{
        questionIndex: number;
        errorMessage: string;
      }>
    ) => {
      const { errorMessage, questionIndex } =
        action.payload;
      state.questions[
        questionIndex
      ].numberOfCorrectAnswersError = errorMessage;
    },
    setNumberOfAnswersError: (
      state,
      action: PayloadAction<{
        questionIndex: number;
        errorMessage: string;
      }>
    ) => {
      const { questionIndex, errorMessage } =
        action.payload;
      state.questions[questionIndex].numberOfAnswersError =
        errorMessage;
    },
    setQuestionTitle: (
      state,
      action: PayloadAction<{
        questionId: string;
        title: string;
      }>
    ) => {
      const { questionId, title } = action.payload;
      state.questions.map((q) => {
        if (q.id === questionId) {
          q.question = title;
          q.titleError = undefined;
        }
        return q;
      });
    },
    setAnswerTitle: (
      state,
      action: PayloadAction<{
        questionId: string;
        answerId: string;
        title: string;
      }>
    ) => {
      const { answerId, questionId, title } =
        action.payload;
      state.questions.map((q) => {
        if (q.id === questionId) {
          q.answers = q.answers.map((a) => {
            if (a.id === answerId) {
              a.answer = title;
              a.errorMessage = undefined;
            }
            return a;
          });
        }
        return q;
      });
    },
    setAnswerError: (
      state,
      action: PayloadAction<{
        questionIndex: number;
        answerIndex: number;
        errorMessage: string;
      }>
    ) => {
      const { answerIndex, errorMessage, questionIndex } =
        action.payload;
      state.questions[questionIndex].answers[
        answerIndex
      ].errorMessage = errorMessage;
    },
    setAnswerIsCorrect: (
      state,
      action: PayloadAction<{
        questionId: string;
        answerId: string;
        isCorrect: boolean;
      }>
    ) => {
      const { answerId, questionId, isCorrect } =
        action.payload;
      state.questions.map((q) => {
        if (q.id === questionId) {
          q.answers = q.answers.map((a) => {
            if (a.id === answerId) {
              a.correct = isCorrect;
            }
            return a;
          });
          q.numberOfCorrectAnswersError = undefined;
        }
        return q;
      });
    },
    removeAnswer: (
      state,
      action: PayloadAction<{
        questionId: string;
        answerId: string;
      }>
    ) => {
      const { questionId, answerId } = action.payload;
      state.questions.map((q) => {
        if (q.id === questionId) {
          q.answers = q.answers.filter(
            (a) => a.id !== answerId
          );
        }
        return q;
      });
    },
  },
});

export const {
  addQuestion,
  removeQuestion,
  resetQuestions,
  addAnswerToQuestion,
  setQuestionType,
  setQuestionTitle,
  setAnswerIsCorrect,
  setAnswerTitle,
  removeAnswer,
  setQuestionError,
  setAnswerError,
  setNumberOfCorrectAnswersError,
  setNumberOfAnswersError,
} = questionSlice.actions;

export const selectQuestions = (state: RootState) =>
  state.question.questions;

export default questionSlice.reducer;
