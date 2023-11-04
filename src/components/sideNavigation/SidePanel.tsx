import React from 'react';
import styled from 'styled-components';
import Profile from '../header/Profile';
import MainNavigation from './components/MainNavigation';
import { ScreenSize } from '../../interfaces';

const StyledSidePanel = styled('nav')`
  background-color: rgba(38, 70, 83);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 100;

  @media ${ScreenSize.TABLET} {
    gap: 2rem;
    height: 100vh;
  }
`;

function SidePanel() {
  return (
    <StyledSidePanel>
      <MainNavigation />
      <Profile />
    </StyledSidePanel>
  );
}

export default SidePanel;
