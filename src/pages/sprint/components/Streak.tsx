import React from 'react';
import styled from 'styled-components';

const StyledStreak = styled('ul')<{ $fullfilled: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;

  li {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    &:nth-child(1) {
      background-color: ${(props) =>
        props.$fullfilled === 1 ||
        props.$fullfilled === 2 ||
        props.$fullfilled === 3
          ? 'rgb(231, 111, 81)'
          : 'rgb(233, 196, 106)'};
    }
    &:nth-child(2) {
      background-color: ${(props) =>
        props.$fullfilled === 2 || props.$fullfilled === 3
          ? 'rgb(231, 111, 81)'
          : 'rgb(233, 196, 106)'};
    }
    &:nth-child(3) {
      background-color: ${(props) =>
        props.$fullfilled === 3 ? 'rgb(231, 111, 81)' : 'rgb(233, 196, 106)'};
    }
  }
`;

function Streak({ value }: { value: number }) {
  return (
    <StyledStreak $fullfilled={value}>
      {[0, 1, 2].map((item) => (
        <li key={item} />
      ))}
    </StyledStreak>
  );
}

export default Streak;
