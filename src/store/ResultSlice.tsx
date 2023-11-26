/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  StepValues,
  StreakValues,
  ComplicatedResultType,
  WordType,
} from '../interfaces';

export function updateResultData(
  result: ComplicatedResultType,
  isAnswerCorrect: boolean,
  word: WordType
): ComplicatedResultType {
  const res = { ...result };

  const total = isAnswerCorrect ? res.total + res.step : res.total;

  const step = isAnswerCorrect
    ? res.streak === StreakValues.MAX
      ? res.step + StepValues.MIN
      : res.step
    : StepValues.MIN;

  const streak =
    (res.streak === StreakValues.MAX && isAnswerCorrect) || !isAnswerCorrect
      ? (res.streak = StreakValues.MIN)
      : res.streak + 1;

  const { correct, wrong } = res.answers;

  const answers = isAnswerCorrect
    ? {
        wrong,
        correct: [...correct, word],
      }
    : {
        correct,
        wrong: [...wrong, word],
      };

  return {
    answers,
    step,
    total,
    streak,
  };
}

const initComplicatedResultValue = {
  answers: { correct: [], wrong: [] },
  step: StepValues.MIN,
  total: 0,
  streak: StreakValues.MIN,
};

export interface ResultsState {
  sprint: ComplicatedResultType;
  puzzles: { middleResult: boolean; step: number; total: number };
  audiocall: ComplicatedResultType;
  constructor: {
    step: number;
    total: number;
    answers: {
      correct: WordType[];
      wrong: WordType[];
    };
  };
}

const initPuzzlesResultValue = {
  middleResult: false,
  step: 5,
  total: 0,
};

const initConstructorResultValue = {
  answers: { correct: [], wrong: [] },
  step: 10,
  total: 0,
};

const initialState: ResultsState = {
  sprint: initComplicatedResultValue,
  puzzles: initPuzzlesResultValue,
  audiocall: initComplicatedResultValue,
  constructor: initConstructorResultValue,
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    updateSprintResult: (
      state,
      action: PayloadAction<{ isAnswerCorrect: boolean; word: WordType }>
    ) => {
      state.sprint = updateResultData(
        state.sprint,
        action.payload.isAnswerCorrect,
        action.payload.word
      );
    },

    resetSprintResult: (state) => {
      state.sprint = initComplicatedResultValue;
    },

    setPuzzlesResult: (state, action: PayloadAction<{ step: number }>) => {
      state.puzzles = { ...initPuzzlesResultValue, ...action.payload };
    },

    updatePuzzlesMiddleResult: (state, action: PayloadAction<boolean>) => {
      state.puzzles.middleResult = action.payload;
    },

    updatePuzzlesTotalResult: (state) => {
      if (state.puzzles.middleResult) {
        state.puzzles.total += state.puzzles.step;
      } else {
        state.puzzles.total -= 1;
      }
      state.puzzles.middleResult = false;
    },

    updateAudiocallResult: (
      state,
      action: PayloadAction<{ isAnswerCorrect: boolean; word: WordType }>
    ) => {
      state.audiocall = updateResultData(
        state.audiocall,
        action.payload.isAnswerCorrect,
        action.payload.word
      );
    },

    updateConstructorResult: (
      state,
      action: PayloadAction<{ isAnswerCorrect: boolean; word: WordType }>
    ) => {
      const answers = action.payload.isAnswerCorrect
        ? {
            ...state.constructor.answers,
            correct: [
              ...state.constructor.answers.correct,
              action.payload.word,
            ],
          }
        : {
            ...state.constructor.answers,
            wrong: [...state.constructor.answers.wrong, action.payload.word],
          };

      const total = action.payload.isAnswerCorrect
        ? state.constructor.total + state.constructor.step
        : state.constructor.total - 1;

      state.constructor = {
        ...state.constructor,
        total,
        answers,
      };
    },

    resetAudiocallResult: (state) => {
      state.audiocall = initComplicatedResultValue;
    },

    resetConstructorResult: (state) => {
      state.constructor = initConstructorResultValue;
    },
  },
});

export const {
  resetSprintResult,
  updateSprintResult,
  updatePuzzlesMiddleResult,
  updatePuzzlesTotalResult,
  setPuzzlesResult,
  updateAudiocallResult,
  resetAudiocallResult,
  resetConstructorResult,
  updateConstructorResult,
} = resultsSlice.actions;

export default resultsSlice.reducer;
