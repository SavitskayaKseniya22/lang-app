import React, { useContext, useEffect } from 'react';
import { GameContext } from '../game/components/GameStartScreen';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { StyledMain } from '../../styled/SharedStyles';
import { DataQueue } from '../../utils';
import ConstructorGame from './components/ConstructorGame';
import { useAppDispatch } from '../../store/store';
import { resetConstructorResult } from '../../store/ResultSlice';

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

  return (
    <StyledMain>
      <h3>No data found. Please reload the page or return to the Main Page.</h3>
    </StyledMain>
  );
}

export default Constructor;
