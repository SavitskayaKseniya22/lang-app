import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GameType } from '../../../interfaces';
import GameTip from './GameTip';
import { StyledMain } from '../../../styled/SharedStyles';

const StyledGameLayout = styled(StyledMain)`
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
