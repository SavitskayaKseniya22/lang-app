import React, { useContext, useEffect } from 'react';
import { GameContext } from '../game/components/GameStartScreen';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { DataQueue } from '../../utils';
import AudiocallGame from './components/AudiocallGame';
import { StyledMain } from '../../styled/SharedStyles';
import { useAppDispatch } from '../../store/store';
import { resetAudiocallResult } from '../../store/ResultSlice';

function Audiocall() {
  const { initial } = useContext(GameContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAudiocallResult());
  }, [dispatch]);

  const { data, isLoading } = useGetRandomWordsQuery(
    { group: initial.group },
    {
      skip: !!initial.data,
    }
  );

  if (initial.data) {
    return <AudiocallGame data={new DataQueue(initial.data)} />;
  }

  if (data) {
    return <AudiocallGame data={new DataQueue(data)} />;
  }

  if (isLoading) return <Spinner />;

  return (
    <StyledMain>
      <h3>No data found. Please reload the page or return to the Main Page.</h3>
    </StyledMain>
  );
}

export default Audiocall;
