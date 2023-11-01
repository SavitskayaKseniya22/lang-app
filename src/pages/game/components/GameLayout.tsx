import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GameType } from '../../../interfaces';
import GameTip from './GameTip';

const StyledGameLayout = styled('main')`
  flex-grow: 11;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  gap: 1rem;

  h2 {
    align-self: flex-start;
  }
`;

function GameLayout({ type }: { type: GameType }) {
  return (
    <StyledGameLayout>
      <h2>{type}</h2>
      <Outlet />
      <GameTip type={type} />
    </StyledGameLayout>
  );
}

export default GameLayout;
