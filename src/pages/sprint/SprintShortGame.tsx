import React, { SyntheticEvent, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ActiveWordsTypes, WordBaseValues, WordType } from '../../interfaces';
import { getActiveWordsArgs, checkIfAnswerCorrect } from '../../utils';
import Streak from './components/Streak';
import Points from './components/Points';
import SprintRound from './components/SprintRound';
import ActiveWordsList from './components/ActiveWordsList';
import { OutletContextType } from './components/ResultContext';
import StyledSprint from './components/StyledSprint';

function SprintShortGame({ data }: { data: WordType[] }) {
  const { result, updateResult } = useOutletContext<OutletContextType>();

  const navigate = useNavigate();

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes>(
    getActiveWordsArgs(data, WordBaseValues.MINWORD)
  );

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    const { first, second } = activeWords;

    const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

    updateResult(isAnswerCorrect, first.word);

    if (first.index < WordBaseValues.MAXWORD) {
      setActiveWords(getActiveWordsArgs(data, first.index + 1));
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
