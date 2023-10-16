/* eslint-disable react/jsx-props-no-spreading */

import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import {
  ActiveWordsTypes,
  GameResultType,
  TextBookValuesTypes,
} from '../../interfaces';
import { getActiveWordsArgs, isAnswerCorrect } from '../../utils';
import Timer from './components/Timer';

function Sprint() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { group } = useParams();

  const [args, setArgs] = useState<TextBookValuesTypes>(
    state || { group, page: 0 } || { group: 0, page: 0 }
  );

  const { currentData: gameData } = useGetAllWordsQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes | null>(null);

  useEffect(() => {
    if (gameData) {
      setActiveWords(getActiveWordsArgs(gameData, 0));
    }
  }, [gameData]);

  const answers = useRef<GameResultType>([]);

  const { register, handleSubmit, reset } = useForm();

  const onChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (gameData && activeWords) {
      const { first, second } = activeWords;

      answers.current.push({
        word: first.word,
        answer: isAnswerCorrect(value, first, second),
      });

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
      <Timer
        duration={5}
        doAfterTimer={() => {
          navigate('result', { state: answers.current });
        }}
      />
      {activeWords && (
        <form onSubmit={handleSubmit(() => {})}>
          <ul>
            <li>{activeWords.first?.word?.word}</li>
            <li>{activeWords.second?.word?.wordTranslate}</li>
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
      )}
    </div>
  );
}

export default Sprint;
