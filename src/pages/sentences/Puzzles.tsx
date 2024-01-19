import React, { useContext, useEffect } from 'react';
import PuzzlesGame from './components/PuzzlesGame';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { GameContext } from '../game/components/GameStartScreen';
import {
  DataQueue,
  checkStepValue,
  getRandomItemsFromArray,
} from '../../utils';
import { resetPuzzlesResult, setPuzzlesResult } from '../../store/ResultSlice';
import { useAppDispatch } from '../../store/store';
import ErrorPage, { ErrorType } from '../errorPage/ErrorPage';

function Puzzles() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPuzzlesResult());
  }, [dispatch]);

  const { initial } = useContext(GameContext);

  const { data, isLoading } = useGetRandomWordsQuery(
    { group: undefined },
    {
      skip: !!initial.data,
    }
  );

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

  if (data) {
    return (
      <PuzzlesGame data={new DataQueue(getRandomItemsFromArray(data, 10))} />
    );
  }

  return <ErrorPage type={ErrorType.ERROR} />;
}

export default Puzzles;
