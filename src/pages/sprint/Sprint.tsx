/* eslint-disable react/jsx-props-no-spreading */

import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import {
  ActiveWordsTypes,
  GameResultType,
  TextBookValuesTypes,
  WordType,
} from '../../interfaces';
import { getActiveWordsArgs } from '../../utils';
import Timer from './components/Timer';
import ResultContext from './components/Context';

function Sprint() {
  const { state } = useLocation();
  const { group } = useParams();

  const [args, setArgs] = useState<TextBookValuesTypes>(
    state || { group, page: 0 }
  );

  const { currentData: gameData } = useGetAllWordsQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes>({
    first: {
      index: 0,
      word: {} as WordType,
    },
    second: {
      index: 0,
      word: {} as WordType,
    },
  });

  useEffect(() => {
    if (gameData) {
      setActiveWords(getActiveWordsArgs(gameData, 0));
    }
  }, [gameData]);

  const answers = useRef<GameResultType>({
    correct: [],
    wrong: [],
    total: [],
  });

  const { register, handleSubmit, reset } = useForm();

  const onChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (gameData) {
      const { first, second } = activeWords;
      const { correct, total, wrong } = answers.current;
      if (
        (value === 'true' && first.word?.id === second.word?.id) ||
        (value === 'false' && first.word?.id !== second.word?.id)
      ) {
        correct.push(first.word);
        total.push('correct');
      } else {
        wrong.push(first.word);
        total.push('wrong');
      }

      reset();

      if (first.index + 1 < gameData.length) {
        setActiveWords(getActiveWordsArgs(gameData, first.index + 1));
      } else {
        setArgs({
          page: args.page + 1 < 29 ? args.page + 1 : 0,
          group: args.group,
        });
      }
    }
  };

  return (
    <div>
      <ResultContext.Provider value={answers}>
        <Timer duration={5} />
        <form onSubmit={handleSubmit(() => {})}>
          <ul>
            <li>{activeWords.first.word?.word}</li>
            <li>{activeWords.second.word?.wordTranslate}</li>
          </ul>
          {['false', 'true'].map((item) => (
            <label htmlFor={`game-choice-${item}`} key={item}>
              {item}
              <input
                {...register('game-choice', {
                  onChange,
                })}
                type="radio"
                value={item}
                id={`game-choice-${item}`}
              />
            </label>
          ))}
        </form>
      </ResultContext.Provider>
    </div>
  );
}

export default Sprint;
