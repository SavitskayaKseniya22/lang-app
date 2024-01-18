import React from 'react';
import { useAppSelector } from '../../../store/store';
import { StyledMain } from '../../../styled/SharedStyles';

function PuzzleResult() {
  const { puzzles } = useAppSelector((state) => state.resultsReducer);
  return (
    <StyledMain>
      <h4>{puzzles.total} points</h4>
    </StyledMain>
  );
}

export default PuzzleResult;
