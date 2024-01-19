/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  StepValues,
  StreakValues,
  ComplicatedResultType,
  WordType,
  ResultsState,
  StepType,
  UpdateResultType,
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

const initAnswersValue = { correct: [], wrong: [] };

const initComplicatedResultValue = {
  answers: initAnswersValue,
  step: StepValues.MIN,
  total: 0,
  streak: StreakValues.MIN,
};

const initPuzzlesResultValue = {
  middleResult: false,
  step: 5,
  total: 0,
  correct: 0,
  wrong: 0,
};

const initConstructorResultValue = {
  answers: initAnswersValue,
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
    updateSprintResult: (state, action: PayloadAction<UpdateResultType>) => {
      state.sprint = updateResultData(
        state.sprint,
        action.payload.isAnswerCorrect,
        action.payload.word
      );
    },

    resetSprintResult: (state) => {
      state.sprint = initComplicatedResultValue;
    },

    setPuzzlesResult: (state, action: PayloadAction<StepType>) => {
      state.puzzles = { ...initPuzzlesResultValue, ...action.payload };
    },

    updatePuzzlesMiddleResult: (
      state,
      action: PayloadAction<{
        middleResult: boolean;
      }>
    ) => {
      state.puzzles.middleResult = action.payload.middleResult;
    },

    updatePuzzlesTotalResult: (state) => {
      if (state.puzzles.middleResult) {
        state.puzzles.total += state.puzzles.step;
        state.puzzles.correct += 1;
      } else {
        state.puzzles.total -= 1;
        state.puzzles.wrong += 1;
      }

      state.puzzles.middleResult = false;
    },

    resetPuzzlesResult: (state) => {
      state.puzzles = initPuzzlesResultValue;
    },

    updateAudiocallResult: (state, action: PayloadAction<UpdateResultType>) => {
      state.audiocall = updateResultData(
        state.audiocall,
        action.payload.isAnswerCorrect,
        action.payload.word
      );
    },

    resetAudiocallResult: (state) => {
      state.audiocall = initComplicatedResultValue;
    },

    updateConstructorResult: (
      state,
      action: PayloadAction<UpdateResultType>
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
  resetPuzzlesResult,
} = resultsSlice.actions;

export default resultsSlice.reducer;
