import React from 'react';

import styled from 'styled-components';
import { GameType, GameTipView, ChildrenProps } from '../../../interfaces';
import GameTip from './GameTip';
import Suspended from '../../../components/Suspended';

const StyledGameContainer = styled('main')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;

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
  condition,
  children,
}: {
  type: GameType;
  condition: boolean;
  children: ChildrenProps;
}) {
  return (
    <StyledGameContainer>
      <Suspended condition={condition}>{children}</Suspended>
      <GameTip type={type} $view={GameTipView.SMALL} />
    </StyledGameContainer>
  );
}

export default GameContainer;
