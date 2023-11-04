import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GameResultType, ResultStatsType } from '../../interfaces';
import { getPercent, getResultMessage } from '../../utils';
import WordList from '../textBookPage/components/WordList';
import { StyledMain } from '../../styled/SharedStyles';

export const isGameResultState = (
  state: undefined | null | GameResultType
): state is GameResultType => (state as GameResultType).answers !== undefined;

export function makeResult(state: GameResultType): ResultStatsType {
  const { correct, wrong } = state.answers;

  const percent = getPercent(correct.length + wrong.length, correct.length);

  return {
    correct,
    wrong,
    percent,
    message: getResultMessage(percent),
  };
}

const StyledGameResultContent = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
`;

const StyledGameResultContentItem = styled('li')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function GameResult() {
  const { state } = useLocation();

  if (state && isGameResultState(state)) {
    const { correct, wrong, percent, message } = makeResult(state);

    return (
      <StyledMain>
        <h2>{message}</h2>
        <h3>{`${percent}% correct answers`}</h3>

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

  return <StyledMain>No result data found</StyledMain>;
}

export default GameResult;
