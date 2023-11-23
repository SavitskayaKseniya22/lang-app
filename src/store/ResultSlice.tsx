/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  StepValues,
  StreakValues,
  SprintResultType,
  WordType,
} from '../interfaces';

export function updateResultData(
  result: SprintResultType,
  isAnswerCorrect: boolean,
  word: WordType
): SprintResultType {
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

const initSprintResultValue = {
  answers: { correct: [], wrong: [] },
  step: StepValues.MIN,
  total: 0,
  streak: StreakValues.MIN,
} as SprintResultType;

export interface ResultsState {
  sprint: SprintResultType;
  puzzles: { middleResult: boolean; step: number; total: number };
}

const initPuzzlesResultValue = {
  middleResult: false,
  step: 5,
  total: 0,
};

const initialState: ResultsState = {
  sprint: initSprintResultValue,
  puzzles: initPuzzlesResultValue,
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setSprintResult: (state, action: PayloadAction<SprintResultType>) => {
      state.sprint = action.payload;
    },

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
      state.sprint = initSprintResultValue;
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
  },
});

export const {
  setSprintResult,
  resetSprintResult,
  updateSprintResult,
  updatePuzzlesMiddleResult,
  updatePuzzlesTotalResult,
  setPuzzlesResult,
} = resultsSlice.actions;

export default resultsSlice.reducer;
