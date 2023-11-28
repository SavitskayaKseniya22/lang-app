import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllWordsQuery } from '../../../store/wordsApi';
import {
  ActiveWordsTypes,
  DefaultTextBookValues,
  GroupType,
  WordBaseValues,
} from '../../../interfaces';
import { DataQueue, checkIfAnswerCorrect } from '../../../utils';
import Timer from '../../game/components/Timer';
import Streak from '../../game/components/Streak';
import Points from '../../game/components/Points';
import SprintRound from './SprintRound';
import ActiveWordsList from './ActiveWordsList';
import Spinner from '../../../components/spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateSprintResult } from '../../../store/ResultSlice';
import { StyledGameContainer, StyledMain } from '../../../styled/SharedStyles';
import GameInfo from '../../game/components/GameInfo';

function SprintLongGame({ group = DefaultTextBookValues.group }: GroupType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sprint } = useAppSelector((state) => state.resultsReducer);
  const pageRef = useRef(DefaultTextBookValues.page);

  const data = useRef<null | DataQueue>(null);

  const [activeWords, setActiveWords] = useState<ActiveWordsTypes | null>(null);

  const { currentData, isLoading } = useGetAllWordsQuery(
    { group, page: pageRef.current },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (currentData) {
      const dataQueue = new DataQueue(currentData);
      data.current = dataQueue;
      setActiveWords(dataQueue.nextPair());
    }
  }, [currentData]);

  const handleClick = (value: string) => {
    if (data.current && activeWords) {
      const { first, second } = activeWords;

      const isAnswerCorrect = checkIfAnswerCorrect(value, first, second);

      dispatch(updateSprintResult({ isAnswerCorrect, word: first }));

      if (data.current.isEmpty) {
        pageRef.current =
          pageRef.current < WordBaseValues.MAXPAGE
            ? pageRef.current + 1
            : WordBaseValues.MINPAGE;
      } else {
        setActiveWords(data.current.nextPair());
      }
    }
  };

  const doAfterTimer = useCallback(() => {
    navigate(`/games/sprint/result`);
  }, [navigate]);

  if (isLoading) return <Spinner />;

  if (data.current && activeWords) {
    return (
      <StyledMain>
        <GameInfo>
          <Points step={sprint.step} total={sprint.total} />
        </GameInfo>
        <Timer duration={60} doAfterTimer={doAfterTimer} />

        <StyledGameContainer>
          <Streak streak={sprint.streak} total={3} />
          <ActiveWordsList words={activeWords} />
          <SprintRound handleClick={handleClick} />
        </StyledGameContainer>
      </StyledMain>
    );
  }

  return <div>No data found. Please return to the main page</div>;
}

export default SprintLongGame;
