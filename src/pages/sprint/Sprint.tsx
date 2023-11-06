import React from 'react';
import { useLocation } from 'react-router-dom';
import SprintShortGame from './SprintShortGame';
import SprintLongGame from './SprintLongGame';

function Sprint() {
  const { group, data } = useLocation().state;
  if (data && data.length) {
    return <SprintShortGame data={data} />;
  }

  return <SprintLongGame group={group} />;
}

export default Sprint;
