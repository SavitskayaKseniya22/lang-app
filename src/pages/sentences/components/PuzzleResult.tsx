import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../../store/store';
import { StyledMain } from '../../../styled/SharedStyles';
import { getPercent, getResultMessage } from '../../../utils';

const StyledResult = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
  gap: 2rem;
  text-align: center;

  .result__detailed {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

function PuzzleResult() {
  const { puzzles } = useAppSelector((state) => state.resultsReducer);

  if (puzzles && (puzzles.correct || puzzles.wrong)) {
    const percent = getPercent(
      puzzles.correct + puzzles.wrong,
      puzzles.correct
    );

    const message = getResultMessage(percent);

    return (
      <StyledMain>
        <h2 className="main__title_main">Results</h2>
        <StyledResult>
          <h2>Points gained: {puzzles.total}</h2>
          <h3>{message}</h3>
          <h5>{`${percent}% correct answers`}</h5>
          <ul className="result__detailed">
            <li>
              <h4>{`Correct: ${puzzles.correct}`}</h4>
            </li>
            <li>
              <h4>{`Wrong: ${puzzles.wrong}`}</h4>
            </li>
          </ul>
        </StyledResult>
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default PuzzleResult;
