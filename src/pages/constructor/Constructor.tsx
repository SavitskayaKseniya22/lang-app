import React, { useContext, useEffect } from 'react';
import { GameContext } from '../game/components/GameStartScreen';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { DataQueue } from '../../utils';
import ConstructorGame from './components/ConstructorGame';
import { useAppDispatch } from '../../store/store';
import { resetConstructorResult } from '../../store/ResultSlice';
import ErrorPage, { ErrorType } from '../errorPage/ErrorPage';

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
