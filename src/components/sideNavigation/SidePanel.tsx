import React from 'react';
import styled from 'styled-components';
import { gradientBackground } from '../../styled/SharedStyles';
import Profile from '../header/Profile';
import GitHubLink from './components/GitHubLink';
import MainNavigation from './components/MainNavigation';
import { ScreenSize } from '../../interfaces';

const StyledSidePanel = styled('nav')`
  ${gradientBackground}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  @media ${ScreenSize.TABLET} {
    gap: 2rem;
  }
`;

function SidePanel() {
  return (
    <StyledSidePanel>
      <MainNavigation />
      <Profile />
      <GitHubLink />
    </StyledSidePanel>
  );
}

export default SidePanel;
