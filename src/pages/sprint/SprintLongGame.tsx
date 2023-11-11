import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import {
  ActiveWordsTypes,
  DefaultTextBookValues,
  TextBookValuesTypes,
  WordBaseValues,
} from '../../interfaces';
import { getActiveWordsArgs, checkIfAnswerCorrect } from '../../utils';
import Timer from './components/Timer';
import Streak from './components/Streak';
import Points from './components/Points';
import SprintRound from './components/SprintRound';
import ActiveWordsList from './components/ActiveWordsList';
import { OutletContextType } from './components/ResultContext';
import Spinner from '../../components/spinner/Spinner';
import StyledSprint from './components/StyledSprint';

function SprintLongGame({
  group = DefaultTextBookValues.group,
}: {
  group: number;
}) {
  const { result, updateResult } = useOutletContext<OutletContextType>();

  const navigate = useNavigate();
  const [activeWords, setActiveWords] = useState<ActiveWordsTypes | null>(null);

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

      updateResult(isAnswerCorrect, first.word);

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
    navigate(`result`);
  }, [navigate]);

  if (isLoading) return <Spinner />;

  if (data && data.length && activeWords) {
    return (
      <StyledSprint>
        <Timer duration={999} doAfterTimer={doAfterTimer} />
        <Points step={result.current.step} total={result.current.total} />
        <Streak streak={result.current.streak} total={3} />
        <ActiveWordsList words={activeWords} />
        <SprintRound handleChange={handleChange} />
      </StyledSprint>
    );
  }

  return <div>No data found. Please return to the main page</div>;
}

export default SprintLongGame;
