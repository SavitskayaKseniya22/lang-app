import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { StyledMain } from '../../../styled/SharedStyles';
import GameResultDetailed from '../../game/components/GameResultDetailed';

function ConstructorResult() {
  const { constructor } = useAppSelector((state) => state.resultsReducer);

  console.log(constructor);

  if (
    constructor &&
    (constructor.answers.correct.length || constructor.answers.wrong.length)
  ) {
    return (
      <StyledMain>
        <h2>{constructor.total} points</h2>
        <GameResultDetailed result={constructor} />
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default ConstructorResult;
