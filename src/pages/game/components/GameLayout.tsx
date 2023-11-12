import React from 'react';
import styled from 'styled-components';
import { ChildrenProps, GameType } from '../../../interfaces';
import GameTip from './GameTip';
import { StyledMain } from '../../../styled/SharedStyles';

const StyledGameLayout = styled(StyledMain)`
  justify-content: space-between;
  h2 {
    align-self: flex-start;
  }
`;

function GameLayout({
  type,
  children,
}: {
  type: GameType;
  children: ChildrenProps;
}) {
  return (
    <StyledGameLayout>
      <h2>{type}</h2>
      {children}

      <GameTip type={type} />
    </StyledGameLayout>
  );
}

export default GameLayout;
