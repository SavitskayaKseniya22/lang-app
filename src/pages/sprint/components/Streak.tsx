import React from 'react';
import styled from 'styled-components';
import { makeEmptyArrayWithIds } from '../../../utils';

const StyledStreak = styled('ul')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;

  li {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    &.fullfilled {
      background-color: rgb(244, 162, 97);
    }

    &.empty {
      background-color: rgba(233, 197, 106, 0.2);
    }
  }
`;

function Streak({ streak, total }: { streak: number; total: number }) {
  return (
    <StyledStreak>
      {makeEmptyArrayWithIds(total).map((item, i) => (
        <li key={item.key} className={i < streak ? 'fullfilled' : 'empty'} />
      ))}
    </StyledStreak>
  );
}

export default Streak;
