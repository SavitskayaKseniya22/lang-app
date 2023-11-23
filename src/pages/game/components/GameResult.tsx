import React from 'react';
import styled from 'styled-components';
import { SprintResultType, ResultStatsType } from '../../../interfaces';
import { getPercent, getResultMessage } from '../../../utils';
import WordList from '../../textBookPage/components/WordList';
import { StyledMain } from '../../../styled/SharedStyles';
import { useAppSelector } from '../../../store/store';
import GameResultDetailed from './GameResultDetailed';

export function makeResult(state: SprintResultType): ResultStatsType {
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
  const { sprint } = useAppSelector((state) => state.resultsReducer);
  const { user } = useAppSelector((state) => state.persist.auth);

  if (sprint) {
    const { correct, wrong, percent, message } = makeResult(sprint);

    return (
      <StyledMain>
        <h2>{message}</h2>
        <h3>{`${percent}% correct answers`}</h3>
        <h2>{sprint.total} points</h2>

        {user && <GameResultDetailed userId={user.localId} result={sprint} />}

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
