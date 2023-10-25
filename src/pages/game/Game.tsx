/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GameProps, GameTipView, GameType } from '../../interfaces';
import GameTip from './components/GameTip';
import GroupPicker from './components/GroupPicker';

const StyledGame = styled('div')`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    font-size: 4rem;
    margin: 2rem;
    text-align: center;
    font-family: 'Shizuru', cursive;
  }
`;

function Game({ type, page = 0, group = 0 }: GameProps) {
  const navigate = useNavigate();

  return (
    <StyledGame>
      <h2>{type}</h2>
      <GameTip type={type} $view={GameTipView.BIG} />
      {(type === GameType.AUDIOCALL || type === GameType.SPRINT) && (
        <GroupPicker initValues={{ page, group }} />
      )}
      {type === GameType.PUZZLES && (
        <button
          type="button"
          onClick={() => {
            navigate('0');
          }}
        >
          Start the game
        </button>
      )}
    </StyledGame>
  );
}

export default Game;
