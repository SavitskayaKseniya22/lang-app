import React from 'react';
import styled from 'styled-components';
import { makeEmptyArrayWithIds } from '../../../utils';

const StyledProgressTracking = styled('ul')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  flex-wrap: nowrap;
  width: 10rem;
  height: 1rem;
`;

const StyledProgressItem = styled('li')<{ $type: 'fullfilled' | 'empty' }>`
  background-color: ${(props) =>
    props.$type === 'fullfilled'
      ? 'rgb(244, 162, 97)'
      : 'rgba(233, 197, 106, 0.2)'};

  max-width: 1rem;
  flex-grow: 1;
  height: 1rem;
`;

function ProgressTracking({
  streak,
  total,
}: {
  streak: number;
  total: number;
}) {
  return (
    <StyledProgressTracking>
      {makeEmptyArrayWithIds(total).map((item, i) => (
        <StyledProgressItem
          key={item.key}
          $type={i < streak ? 'fullfilled' : 'empty'}
        />
      ))}
    </StyledProgressTracking>
  );
}

export default ProgressTracking;
