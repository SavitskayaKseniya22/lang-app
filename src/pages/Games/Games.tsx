import React from 'react';
import { Link } from 'react-router-dom';
import { StyledMain } from '../../styled/SharedStyles';

function Games() {
  return (
    <StyledMain>
      <ul>
        <li>
          <Link to="sprint">Sprint</Link>
        </li>
        <li>
          <Link to="audiocall">Audiocall</Link>
        </li>
        <li>
          <Link to="puzzles">Puzzles</Link>
        </li>
      </ul>
    </StyledMain>
  );
}

export default Games;
