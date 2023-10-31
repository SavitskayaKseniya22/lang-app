import React from 'react';
import styled from 'styled-components';
import GitHubLink from '../sideNavigation/components/GitHubLink';
import { ScreenSize } from '../../interfaces';

const StyledFooter = styled('footer')`
  padding: 0;
  background-color: transparent;

  @media ${ScreenSize.TABLET} {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <GitHubLink />
    </StyledFooter>
  );
}

export default Footer;
