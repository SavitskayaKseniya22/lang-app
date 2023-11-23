import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SprintShortGame from './components/SprintShortGame';
import SprintLongGame from './components/SprintLongGame';
import { resetSprintResult } from '../../store/ResultSlice';
import { useAppDispatch } from '../../store/store';
import { GameContext } from '../game/components/GameStartScreen';
import { DataQueue } from '../../utils';

function Sprint() {
  const dispatch = useAppDispatch();
  const { initial } = useContext(GameContext);

  useEffect(() => {
    dispatch(resetSprintResult());
  }, [dispatch]);

  if (initial.data) {
    return <SprintShortGame data={new DataQueue(initial.data)} />;
  }

  if (initial.group) {
    return <SprintLongGame group={+initial.group} />;
  }

  return <Navigate to="/games/sprint" />;
}

export default Sprint;
