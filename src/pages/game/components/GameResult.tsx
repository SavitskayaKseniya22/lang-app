import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnswersType } from '../../../interfaces';
import { getPercent, getResultMessage } from '../../../utils';
import { StyledMain } from '../../../styled/SharedStyles';
import { useAppSelector } from '../../../store/store';
import GameResultDetailed from './GameResultDetailed';

export function makeResult(state: AnswersType) {
  const { correct, wrong } = state.answers;

  const percent = getPercent(correct.length + wrong.length, correct.length);

  return {
    percent,
    message: getResultMessage(percent),
  };
}

export const StyledResult = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  background-color: rgb(255, 255, 255);
  width: 100%;
  z-index: 5;
  padding: 1rem;
  text-align: center;
  position: sticky;
  bottom: 0;
  left: 0;
`;

function GameResult({ type }: { type: 'sprint' | 'audiocall' }) {
  const result = useAppSelector((state) => state.resultsReducer)[type];

  if (
    result &&
    (result.answers.correct.length || result.answers.wrong.length)
  ) {
    const { percent, message } = makeResult(result);

    return (
      <StyledMain>
        <h2 className="main__title_main">Results</h2>
        <GameResultDetailed result={result} />
        <StyledResult>
          <h2>Points gained: {result.total}</h2>
          <h3>{message}</h3>
          <h4>{`${percent}% correct answers`}</h4>
        </StyledResult>
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default GameResult;
