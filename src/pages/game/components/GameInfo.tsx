import React from 'react';
import styled from 'styled-components';
import { ChildrenProps } from '../../../interfaces';

const StyledGameInfo = styled('div')`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: auto;
  justify-content: space-between;
  align-items: center;
`;

function GameInfo({ children }: { children: ChildrenProps }) {
  return <StyledGameInfo>{children}</StyledGameInfo>;
}

export default GameInfo;
