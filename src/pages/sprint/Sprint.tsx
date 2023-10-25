/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */

import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import {
  ActiveWordsTypes,
  GameResultType,
  GameType,
  TextBookValuesTypes,
} from '../../interfaces';
import { getActiveWordsArgs, isAnswerCorrect } from '../../utils';
import Timer from './components/Timer';
import Streak from './components/Streak';
import Points from './components/Points';
import SprintRound from './components/SprintRound';
import ActiveWordsList from './components/ActiveWordsList';
import GameContainer from '../game/components/GameContainer';

const StyledSprint = styled('div')`
  width: 1024px;
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

function Sprint() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { group } = useParams();

  const [args, setArgs] = useState<TextBookValuesTypes>(
    state || { group, page: 0 } || { group: 0, page: 0 }
  );

  const [result, setResult] = useState({
    answers: [],
    points: {
      step: 10,
      total: 0,
    },
    streak: 0,
  } as GameResultType);

  const { currentData: gameData } = useGetAllWordsQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes | null>(null);

  useEffect(() => {
    if (gameData) {
      setActiveWords(getActiveWordsArgs(gameData, 0));
    }
  }, [gameData]);

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (gameData && activeWords) {
      const { first, second } = activeWords;

      const answerResult = isAnswerCorrect(value, first, second);

      setResult((res) => {
        const total = answerResult
          ? res.points.total + res.points.step
          : res.points.total;

        const step =
          // eslint-disable-next-line no-nested-ternary
          answerResult
            ? res.streak === 3
              ? res.points.step + 10
              : res.points.step
            : 10;

        const streak =
          (res.streak === 3 && answerResult) || !answerResult
            ? (res.streak = 0)
            : res.streak + +answerResult;

        return {
          answers: [
            ...result.answers,
            {
              word: first.word,
              answer: isAnswerCorrect(value, first, second),
            },
          ],
          points: {
            step,
            total,
          },
          streak,
        };
      });

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

  const doAfterTimer = useCallback(() => {
    navigate(`result`, { state: result });
  }, [navigate, result]);

  return (
    <GameContainer type={GameType.SPRINT} condition={!!activeWords}>
      <StyledSprint>
        <Timer duration={666} doAfterTimer={doAfterTimer} />
        <Points value={result.points} />
        <Streak value={result.streak} />
        <ActiveWordsList words={activeWords} />
        <SprintRound handleChange={handleChange} />
      </StyledSprint>
    </GameContainer>
  );
}

export default Sprint;
