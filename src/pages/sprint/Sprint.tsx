import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SprintShortGame from './components/SprintShortGame';
import SprintLongGame from './components/SprintLongGame';

function Sprint() {
  const { state } = useLocation();

  if (state) {
    if (state.data && state.data.length) {
      return <SprintShortGame data={state.data} />;
    }
    if (state.group) {
      return <SprintLongGame group={state.group} />;
    }
  }

  return <Navigate to="/games/sprint" />;
}

export default Sprint;
