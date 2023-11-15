import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActiveWordsTypes,
  WordBaseValues,
  WordType,
} from '../../../interfaces';
import { getActiveWordsArgs, checkIfAnswerCorrect } from '../../../utils';
import Streak from './Streak';
import Points from './Points';
import SprintRound from './SprintRound';
import ActiveWordsList from './ActiveWordsList';
import StyledSprint from './StyledSprint';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateSprintResult } from '../../../store/ResultSlice';

function SprintShortGame({ data }: { data: WordType[] }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sprint } = useAppSelector((state) => state.resultsReducer);
  const [activeWords, setActiveWords] = useState<ActiveWordsTypes>(
    getActiveWordsArgs(data, WordBaseValues.MINWORD, data.length - 1)
  );

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    const { first, second } = activeWords;

    const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

    dispatch(updateSprintResult({ isAnswerCorrect, word: first.word }));

    if (first.index < data.length - 1) {
      setActiveWords(
        getActiveWordsArgs(data, first.index + 1, data.length - 1)
      );
    } else {
      navigate(`result`);
    }
  };

  return (
    <StyledSprint>
      <Points step={sprint.step} total={sprint.total} />
      <Streak streak={sprint.streak} total={3} />
      <ActiveWordsList words={activeWords} />
      <SprintRound handleChange={handleChange} />
    </StyledSprint>
  );
}

export default SprintShortGame;
