import React from 'react';
import { useLocation } from 'react-router-dom';
import { GameResultType, ResultStatsType } from '../../interfaces';
import { getPercent, getResultMessage } from '../../utils';

export const isGameResultState = (
  state: undefined | null | GameResultType
): state is GameResultType => (state as GameResultType).answers !== undefined;

export function makeResult(state: GameResultType): ResultStatsType {
  const correct = state.answers.filter((item) => item.answer);
  const wrong = state.answers.filter((item) => !item.answer);

  const percent = getPercent(state.answers.length, correct.length);

  return {
    correct,
    wrong,
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
            <h3>{`Correct answers (${correct.length}):`}</h3>
            <ul>
              {correct.map((item) => (
                <li
                  key={item.word.id}
                >{`${item.word.word} - ${item.word.wordTranslate}`}</li>
              ))}
            </ul>
          </li>
          <li>
            <h3>{`Wrong answers (${wrong.length}):`}</h3>
            <ul>
              {wrong.map((item) => (
                <li
                  key={item.word.id}
                >{`${item.word.word} - ${item.word.wordTranslate}`}</li>
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
