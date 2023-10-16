import React from 'react';
import { useLocation } from 'react-router-dom';
import { GameResultType, ResultStatsType } from '../../interfaces';
import { getPercent, getResultMessage } from '../../utils';

export const isGameResultState = (
  state: object | null | GameResultType
): state is GameResultType => (state as GameResultType).correct !== undefined;

export function makeResult(state: GameResultType): ResultStatsType {
  const { correct, wrong, total } = state;

  const percent = getPercent(correct.length + wrong.length, correct.length);

  return {
    correct: correct.length,
    wrong: wrong.length,
    total: total.length,
    percent,
    message: getResultMessage(percent),
  };
}

function GameResult() {
  const { state } = useLocation();

  if (state && isGameResultState(state)) {
    const { correct, wrong, percent, message } = makeResult(state);

    return (
      <div>
        <h2>{message}</h2>
        <h3>{`${percent}% correct answers`}</h3>

        <ul>
          <li>
            <h3>{`Correct answers (${correct}):`}</h3>
            <ul>
              {state.correct.map((item) => (
                <li key={item.id}>{`${item.word} - ${item.wordTranslate}`}</li>
              ))}
            </ul>
          </li>
          <li>
            <h3>{`Wrong answers (${wrong}):`}</h3>
            <ul>
              {state.wrong.map((item) => (
                <li key={item.id}>{`${item.word} - ${item.wordTranslate}`}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
  return <div>No result data found</div>;
}

export default GameResult;
