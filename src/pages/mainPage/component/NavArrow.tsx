import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const sections = ['#section-0', '#section-1', '#section-2'];

const StyledNavArrow = styled('a')`
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  i {
    font-size: 2rem;
    color: rgb(38, 70, 83);
  }
`;

export function NavArrow() {
  const location = useLocation();
  const index =
    sections.indexOf(location.hash) === -1
      ? 0
      : sections.indexOf(location.hash);

  const isItLast = index + 1 === sections.length;

  return (
    <StyledNavArrow
      href={sections[isItLast ? 0 : index + 1]}
      onClick={() => {}}
    >
      {isItLast ? (
        <i className="fa-solid fa-arrow-up" />
      ) : (
        <i className="fa-solid fa-arrow-down" />
      )}
    </StyledNavArrow>
  );
}

export default NavArrow;
