/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { StyledMain } from '../../../styled/SharedStyles';
import { useAppSelector } from '../../../store/store';
import GameResultDetailed from './GameResultDetailed';
import GameResultInfo from './GameResultInfo';
import { makeLineFromParcedTime, getParcedTime } from '../../../utils';

function GameResult({
  type,
}: {
  type: 'sprint' | 'audiocall' | 'constructor';
}) {
  const result = useAppSelector((state) => state.resultsReducer)[type];

  const location = useLocation();

  const navigate = useNavigate();

  if (
    result &&
    (result.answers.correct.length || result.answers.wrong.length)
  ) {
    return (
      <StyledMain>
        <h2 className="main__title_main">Results</h2>
        <GameResultDetailed result={result} />

        <GameResultInfo
          correct={result.answers.correct.length}
          wrong={result.answers.wrong.length}
          total={result.total}
        />
        {'time' in result && (
          <div>
            {makeLineFromParcedTime(getParcedTime({ time: result.time }))}
          </div>
        )}

        {location.state?.data && (
          <button
            type="button"
            onClick={() => {
              navigate(`/games/${type}/game`, {
                state: location.state,
              });
            }}
          >
            repeat the game
          </button>
        )}
      </StyledMain>
    );
  }

  return <Navigate to="/" />;
}

export default GameResult;
