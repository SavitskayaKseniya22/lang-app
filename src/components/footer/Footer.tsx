import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled('footer')`
  grid-area: 2 / 2 / 3 / 3;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: black;
`;

function Footer() {
  return (
    <StyledFooter>
      <span>&#169; 2023</span>
    </StyledFooter>
  );
}

export default Footer;
