import React from 'react';

import styled from 'styled-components';
import { GameType, GameTipView, ChildrenProps } from '../../../interfaces';
import GameTip from './GameTip';

const StyledGameContainer = styled('div')`
  width: 1024px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  .game-tip {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: -1;
    opacity: 0.7;
  }
`;

function GameContainer({
  type,
  children,
}: {
  type: GameType;
  children: ChildrenProps;
}) {
  return (
    <StyledGameContainer>
      {children}
      <GameTip type={type} $view={GameTipView.SMALL} />
    </StyledGameContainer>
  );
}

export default GameContainer;
