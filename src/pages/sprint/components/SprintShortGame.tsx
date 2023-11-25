import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActiveWordsTypes } from '../../../interfaces';
import { checkIfAnswerCorrect, DataQueue } from '../../../utils';
import Streak from '../../game/components/Streak';
import Points from '../../game/components/Points';
import SprintRound from './SprintRound';
import ActiveWordsList from './ActiveWordsList';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateSprintResult } from '../../../store/ResultSlice';
import { StyledGameContainer, StyledMain } from '../../../styled/SharedStyles';
import { GameContext } from '../../game/components/GameStartScreen';
import GameInfo from '../../game/components/GameInfo';
import ProgressTracking from '../../game/components/ProgressTracking';

function SprintShortGame({ data }: { data: DataQueue }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sprint } = useAppSelector((state) => state.resultsReducer);

  const { setInitial } = useContext(GameContext);
  useEffect(
    () => () => {
      setInitial({ data: undefined, group: '1' });
    },

    [setInitial]
  );

  const updater = useCallback(() => data.nextPair(), [data]);

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes>(updater);

  const handleClick = (value: string) => {
    const { first, second } = activeWords;

    const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

    dispatch(updateSprintResult({ isAnswerCorrect, word: first }));

    if (data.isEmpty) {
      navigate(`/games/sprint/result`);
    } else {
      setActiveWords(updater);
    }
  };

  return (
    <StyledMain>
      <GameInfo>
        <ProgressTracking streak={data.head} total={data.startLength} />
        <Points step={sprint.step} total={sprint.total} />
      </GameInfo>
      <StyledGameContainer>
        <Streak streak={sprint.streak} total={3} />
        <ActiveWordsList words={activeWords} />
        <SprintRound handleClick={handleClick} />
      </StyledGameContainer>
    </StyledMain>
  );
}

export default SprintShortGame;
