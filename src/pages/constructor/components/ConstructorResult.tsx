import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { StyledMain } from '../../../styled/SharedStyles';
import GameResultDetailed from '../../game/components/GameResultDetailed';
import { StyledResult, makeResult } from '../../game/components/GameResult';

function ConstructorResult() {
  const result = useAppSelector((state) => state.resultsReducer).constructor;

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

export default ConstructorResult;
