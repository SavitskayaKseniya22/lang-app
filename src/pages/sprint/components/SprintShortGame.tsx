import React, { SyntheticEvent, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
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
import { OutletContextType } from './ResultContext';
import StyledSprint from './StyledSprint';

function SprintShortGame({ data }: { data: WordType[] }) {
  const { result, updateResult } = useOutletContext<OutletContextType>();

  const navigate = useNavigate();

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes>(
    getActiveWordsArgs(data, WordBaseValues.MINWORD, data.length - 1)
  );

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    const { first, second } = activeWords;

    const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

    updateResult(isAnswerCorrect, first.word);

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
      <Points step={result.current.step} total={result.current.total} />
      <Streak streak={result.current.streak} total={3} />
      <ActiveWordsList words={activeWords} />
      <SprintRound handleChange={handleChange} />
    </StyledSprint>
  );
}

export default SprintShortGame;
