import React from 'react';
import styled from 'styled-components';
import Greeting from '../greeting/Greeting';

const StyledHeader = styled('header')`
  grid-area: 1 / 2 / 2 / 3;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
`;

function Header() {
  return (
    <StyledHeader>
      <Greeting />
      <button type="button">
        <i className="fa-solid fa-arrow-right-to-bracket" />
      </button>
    </StyledHeader>
  );
}

export default Header;
