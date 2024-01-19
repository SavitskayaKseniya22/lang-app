import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { StyledMain } from '../../../styled/SharedStyles';
import GameResultInfo from '../../game/components/GameResultInfo';
import { makeLineFromParcedTime, getParcedTime } from '../../../utils';

function PuzzleResult() {
  const { puzzles } = useAppSelector((state) => state.resultsReducer);

  if (puzzles && (puzzles.correct || puzzles.wrong)) {
    return (
      <StyledMain>
        <h2 className="main__title_main">Results</h2>
        <GameResultInfo
          correct={puzzles.correct}
          wrong={puzzles.wrong}
          total={puzzles.total}
        >
          <ul className="result__detailed">
            <li>
              <h4>{`Correct: ${puzzles.correct}`}</h4>
            </li>
            <li>
              <h4>{`Wrong: ${puzzles.wrong}`}</h4>
            </li>
          </ul>
          <div>
            {makeLineFromParcedTime(getParcedTime({ time: puzzles.time }))}
          </div>
        </GameResultInfo>
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default PuzzleResult;
