import React, { useContext, useEffect } from 'react';
import PuzzlesGame from './components/PuzzlesGame';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { StyledMain } from '../../styled/SharedStyles';
import { GameContext } from '../game/components/GameStartScreen';
import {
  DataQueue,
  checkStepValue,
  getRandomItemsFromArray,
} from '../../utils';
import { setPuzzlesResult } from '../../store/ResultSlice';
import { useAppDispatch } from '../../store/store';

function Puzzles() {
  const { initial } = useContext(GameContext);

  const { data, isLoading, isSuccess } = useGetRandomWordsQuery(undefined, {
    skip: !!initial.data,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPuzzlesResult({ step: checkStepValue(initial.group) }));
  }, [dispatch, initial.group]);

  if (isLoading) return <Spinner />;

  if (initial.data) {
    return (
      <PuzzlesGame
        data={new DataQueue(getRandomItemsFromArray(initial.data, 10))}
      />
    );
  }

  if (data && isSuccess) {
    return (
      <PuzzlesGame data={new DataQueue(getRandomItemsFromArray(data, 10))} />
    );
  }

  return (
    <StyledMain>
      <h3>No data found. Please reload the page or return to the Main Page.</h3>
    </StyledMain>
  );
}

export default Puzzles;
