/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */

import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import {
  ActiveWordsTypes,
  DefaultTextBookValues,
  GameResultType,
  StepValues,
  StreakValues,
  TextBookValuesTypes,
  WordBaseValues,
} from '../../interfaces';
import { getActiveWordsArgs, isAnswerCorrect } from '../../utils';
import Timer from './components/Timer';
import Streak from './components/Streak';
import Points from './components/Points';
import SprintRound from './components/SprintRound';
import ActiveWordsList from './components/ActiveWordsList';
import Suspended from '../../components/Suspended';

const StyledSprint = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

function Sprint() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { group } = useParams();

  const [args, setArgs] = useState<TextBookValuesTypes>(
    state || { group, page: WordBaseValues.MINPAGE } || DefaultTextBookValues
  );

  const [result, setResult] = useState({
    answers: [],
    points: {
      step: StepValues.MIN,
      total: 0,
    },
    streak: StreakValues.MIN,
  } as GameResultType);

  const { currentData: gameData } = useGetAllWordsQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes | null>(null);

  useEffect(() => {
    if (gameData) {
      setActiveWords(getActiveWordsArgs(gameData, WordBaseValues.MINWORD));
    }
  }, [gameData]);

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (gameData && activeWords) {
      const { first, second } = activeWords;

      const answer = isAnswerCorrect(value, first, second);

      setResult((res) => {
        const total = answer
          ? res.points.total + res.points.step
          : res.points.total;

        const step =
          // eslint-disable-next-line no-nested-ternary
          answer
            ? res.streak === StreakValues.MAX
              ? res.points.step + StepValues.MIN
              : res.points.step
            : StepValues.MIN;

        const streak =
          (res.streak === StreakValues.MAX && answer) || !answer
            ? (res.streak = StreakValues.MIN)
            : res.streak + +answer;

        return {
          answers: [
            ...result.answers,
            {
              word: first.word,
              answer,
            },
          ],
          points: {
            step,
            total,
          },
          streak,
        };
      });

      if (first.index < WordBaseValues.MAXWORD) {
        setActiveWords(getActiveWordsArgs(gameData, first.index + 1));
      } else {
        setArgs({
          page:
            args.page < WordBaseValues.MAXPAGE
              ? args.page + 1
              : WordBaseValues.MINPAGE,
          group: args.group,
        });
      }
    }
  };

  const doAfterTimer = useCallback(() => {
    navigate(`/result`, { state: result });
  }, [navigate, result]);

  return (
    <Suspended condition={!!activeWords}>
      <StyledSprint>
        <Timer duration={999} doAfterTimer={doAfterTimer} />
        <Points value={result.points} />
        <Streak value={result.streak} />
        <ActiveWordsList words={activeWords} />
        <SprintRound handleChange={handleChange} />
      </StyledSprint>
    </Suspended>
  );
}

export default Sprint;
