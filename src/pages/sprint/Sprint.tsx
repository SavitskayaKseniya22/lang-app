import React from 'react';
import { useLocation } from 'react-router-dom';
import SprintShortGame from './components/SprintShortGame';
import SprintLongGame from './components/SprintLongGame';

function Sprint() {
  const { group, data } = useLocation().state;
  if (data && data.length) {
    return <SprintShortGame data={data} />;
  }

  return <SprintLongGame group={group} />;
}

export default Sprint;
