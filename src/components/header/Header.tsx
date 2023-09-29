import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled('header')`
  grid-area: 1 / 2 / 2 / 3;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <button type="button">
        <i className="fa-solid fa-arrow-right-to-bracket" />
      </button>
    </StyledHeader>
  );
}

export default Header;
