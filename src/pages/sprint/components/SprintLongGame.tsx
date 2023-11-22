import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllWordsQuery } from '../../../store/wordsApi';
import {
  ActiveWordsTypes,
  DefaultTextBookValues,
  TextBookValuesTypes,
  WordBaseValues,
} from '../../../interfaces';
import { getActiveWordsArgs, checkIfAnswerCorrect } from '../../../utils';
import Timer from '../../game/components/Timer';
import Streak from './Streak';
import Points from './Points';
import SprintRound from './SprintRound';
import ActiveWordsList from './ActiveWordsList';
import Spinner from '../../../components/spinner/Spinner';
import StyledSprint from './StyledSprint';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateSprintResult } from '../../../store/ResultSlice';

function SprintLongGame({
  group = DefaultTextBookValues.group,
}: {
  group: number;
}) {
  const navigate = useNavigate();
  const [activeWords, setActiveWords] = useState<ActiveWordsTypes | null>(null);
  const dispatch = useAppDispatch();
  const { sprint } = useAppSelector((state) => state.resultsReducer);
  const [args, setArgs] = useState<TextBookValuesTypes>({
    group,
    page: DefaultTextBookValues.page,
  });

  const { currentData: data, isLoading } = useGetAllWordsQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setActiveWords(
        getActiveWordsArgs(data, WordBaseValues.MINWORD, WordBaseValues.MAXWORD)
      );
    }
  }, [data]);

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (data && activeWords) {
      const { first, second } = activeWords;

      const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

      dispatch(updateSprintResult({ isAnswerCorrect, word: first.word }));

      if (first.index < WordBaseValues.MAXWORD) {
        setActiveWords(
          getActiveWordsArgs(data, first.index + 1, WordBaseValues.MAXWORD)
        );
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
    navigate(`/games/sprint/result`);
  }, [navigate]);

  if (isLoading) return <Spinner />;

  if (data !== null && activeWords) {
    return (
      <StyledSprint>
        <Timer duration={60} doAfterTimer={doAfterTimer} />
        <Points step={sprint.step} total={sprint.total} />
        <Streak streak={sprint.streak} total={3} />
        <ActiveWordsList words={activeWords} />
        <SprintRound handleChange={handleChange} />
      </StyledSprint>
    );
  }

  return <div>No data found. Please return to the main page</div>;
}

export default SprintLongGame;
