import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { ComplicatedResultType } from '../../../interfaces';
import { getPercent, getResultMessage } from '../../../utils';
import WordList from '../../textBookPage/components/WordList';
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

export const StyledGameResultContent = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
`;

export const StyledGameResultContentItem = styled('li')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function GameResult({ type }: { type: 'sprint' | 'audiocall' }) {
  const result = useAppSelector((state) => state.resultsReducer)[type];
  const { user } = useAppSelector((state) => state.persist.auth);

  if (result && result.answers.correct.length && result.answers.wrong.length) {
    const { correct, wrong, percent, message } = makeResult(result);

    return (
      <StyledMain>
        <h2>{message}</h2>
        <h3>{`${percent}% correct answers`}</h3>
        <h2>{result.total} points</h2>

        {user && <GameResultDetailed userId={user.localId} result={result} />}

        <StyledGameResultContent>
          <StyledGameResultContentItem>
            <h4>{`Correct (${correct.length}):`}</h4>
            <WordList data={correct} />
          </StyledGameResultContentItem>
          <StyledGameResultContentItem>
            <h4>{`Wrong (${wrong.length}):`}</h4>
            <WordList data={wrong} />
          </StyledGameResultContentItem>
        </StyledGameResultContent>
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default GameResult;
