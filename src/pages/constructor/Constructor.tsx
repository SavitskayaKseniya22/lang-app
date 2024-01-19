import React, { useContext, useEffect } from 'react';
import { GameContext } from '../game/components/GameStartScreen';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { DataQueue, checkStepValue } from '../../utils';
import ConstructorGame from './components/ConstructorGame';
import { useAppDispatch } from '../../store/store';
import {
  resetConstructorResult,
  setConstructorResult,
} from '../../store/ResultSlice';
import ErrorPage, { ErrorType } from '../errorPage/ErrorPage';
import { GameType } from '../../interfaces';

function Constructor() {
  const { initial } = useContext(GameContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetConstructorResult());
  }, [dispatch]);

  const { data, isLoading } = useGetRandomWordsQuery(
    { group: initial.group },
    {
      skip: !!initial.data,
    }
  );

  useEffect(() => {
    dispatch(
      setConstructorResult({
        step: checkStepValue({
          difficulty: initial.group,
          type: GameType.CONSTRUCTOR,
        }),
      })
    );
  }, [dispatch, initial.group]);

  if (initial.data) {
    return <ConstructorGame data={new DataQueue(initial.data)} />;
  }

  if (data) {
    return <ConstructorGame data={new DataQueue(data)} />;
  }

  if (isLoading) return <Spinner />;

  return <ErrorPage type={ErrorType.ERROR} />;
}

export default Constructor;
