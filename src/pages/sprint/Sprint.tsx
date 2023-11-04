/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */

import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import {
  ActiveWordsTypes,
  DefaultTextBookValues,
  GameDuration,
  GameResultType,
  StepValues,
  StreakValues,
  TextBookValuesTypes,
  WordBaseValues,
  WordType,
} from '../../interfaces';
import { getActiveWordsArgs, checkIfAnswerCorrect } from '../../utils';
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

export function updateSprintResult(
  result: GameResultType,
  isAnswerCorrect: boolean,
  word: WordType
) {
  const res = { ...result };

  const total = isAnswerCorrect ? res.total + res.step : res.total;

  const step = isAnswerCorrect
    ? res.streak === StreakValues.MAX
      ? res.step + StepValues.MIN
      : res.step
    : StepValues.MIN;

  const streak =
    (res.streak === StreakValues.MAX && isAnswerCorrect) || !isAnswerCorrect
      ? (res.streak = StreakValues.MIN)
      : res.streak + 1;

  const { correct, wrong } = res.answers;

  const answers = isAnswerCorrect
    ? { wrong, correct: [...correct, word] }
    : { correct, wrong: [...wrong, word] };

  return {
    answers,
    step,
    total,
    streak,
  };
}

function Sprint() {
  const navigate = useNavigate();
  const { group, page, duration } = useLocation().state;

  const { group: groupParam } = useParams();

  const [args, setArgs] = useState<TextBookValuesTypes>(
    { group, page } || { group: groupParam, page: WordBaseValues.MINPAGE } ||
      DefaultTextBookValues
  );

  const result = useRef({
    answers: { correct: [], wrong: [] },
    step: StepValues.MIN,
    total: 0,
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

      const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

      result.current = updateSprintResult(
        result.current,
        isAnswerCorrect,
        first.word
      );

      if (first.index < WordBaseValues.MAXWORD) {
        setActiveWords(getActiveWordsArgs(gameData, first.index + 1));
      } else if (duration === GameDuration.LONG) {
        setArgs({
          page:
            args.page < WordBaseValues.MAXPAGE
              ? args.page + 1
              : WordBaseValues.MINPAGE,
          group: args.group,
        });
      } else {
        navigate(`/result`, { state: result.current });
      }
    }
  };

  const doAfterTimer = useCallback(() => {
    navigate(`/result`, { state: result.current });
  }, [navigate]);

  return (
    <Suspended condition={!!activeWords}>
      <StyledSprint>
        {duration === GameDuration.LONG && (
          <Timer duration={999} doAfterTimer={doAfterTimer} />
        )}
        <Points step={result.current.step} total={result.current.total} />
        <Streak streak={result.current.streak} total={3} />
        <ActiveWordsList words={activeWords} />
        <SprintRound handleChange={handleChange} />
      </StyledSprint>
    </Suspended>
  );
}

export default Sprint;
