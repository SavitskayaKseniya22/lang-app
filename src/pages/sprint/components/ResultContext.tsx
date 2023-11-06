/* eslint-disable no-nested-ternary */

import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import {
  StepValues,
  StreakValues,
  GameResultType,
  WordType,
} from '../../../interfaces';

const initResultValue = {
  answers: { correct: [], wrong: [] },
  step: StepValues.MIN,
  total: 0,
  streak: StreakValues.MIN,
} as GameResultType;

export interface OutletContextType {
  result: React.MutableRefObject<GameResultType>;
  updateResult: (isAnswerCorrect: boolean, word: WordType) => void;
}

function updateResultData(
  result: GameResultType,
  isAnswerCorrect: boolean,
  word: WordType
): GameResultType {
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
    ? { wrong, correct: [...correct, word] }
    : { correct, wrong: [...wrong, word] };

  return {
    answers,
    step,
    total,
    streak,
  };
}

function ResultContextProvider() {
  const resultRef = useRef(initResultValue);

  const updateResult = (isAnswerCorrect: boolean, word: WordType) => {
    resultRef.current = updateResultData(
      resultRef.current,
      isAnswerCorrect,
      word
    );
  };

  return (
    <Outlet
      context={{ result: resultRef, updateResult } satisfies OutletContextType}
    />
  );
}

export default ResultContextProvider;
