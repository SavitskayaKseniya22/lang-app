import React from 'react';
import { Navigate } from 'react-router-dom';
import { ComplicatedResultType } from '../../../interfaces';
import { getPercent, getResultMessage } from '../../../utils';
import { StyledMain } from '../../../styled/SharedStyles';
import { useAppSelector } from '../../../store/store';
import GameResultDetailed from './GameResultDetailed';

export function makeResult(state: ComplicatedResultType) {
  const { correct, wrong } = state.answers;

  const percent = getPercent(correct.length + wrong.length, correct.length);

  return {
    correct,
    wrong,
    percent,
    message: getResultMessage(percent),
  };
}

function GameResult({ type }: { type: 'sprint' | 'audiocall' }) {
  const result = useAppSelector((state) => state.resultsReducer)[type];

  if (result && result.answers.correct.length && result.answers.wrong.length) {
    const { percent, message } = makeResult(result);

    return (
      <StyledMain>
        <h2>{message}</h2>
        <h3>{`${percent}% correct answers`}</h3>
        <h2>{result.total} points</h2>

        <GameResultDetailed result={result} />
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default GameResult;
