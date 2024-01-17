import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { StyledMain } from '../../../styled/SharedStyles';
import {
  StyledGameResultContent,
  StyledGameResultContentItem,
} from '../../game/components/GameResult';
import WordList from '../../textBookPage/components/WordList';

function ConstructorResult() {
  const { constructor } = useAppSelector((state) => state.resultsReducer);

  if (
    constructor &&
    constructor.answers.correct.length &&
    constructor.answers.wrong.length
  ) {
    return (
      <StyledMain>
        <h2>{constructor.total} points</h2>
        <StyledGameResultContent>
          <StyledGameResultContentItem>
            <h4>{`Correct (${constructor.answers.correct.length}):`}</h4>
            <WordList data={constructor.answers.correct} />
          </StyledGameResultContentItem>
          <StyledGameResultContentItem>
            <h4>{`Wrong (${constructor.answers.wrong.length}):`}</h4>
            <WordList data={constructor.answers.wrong} />
          </StyledGameResultContentItem>
        </StyledGameResultContent>
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default ConstructorResult;
