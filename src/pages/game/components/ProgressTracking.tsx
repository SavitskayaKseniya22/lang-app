import React from 'react';
import styled from 'styled-components';
import { makeEmptyArrayWithIds } from '../../../utils';
import { ProgressType, ScreenSize } from '../../../interfaces';

const StyledProgressTracking = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const StyledProgressList = styled('ul')`
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

const StyledProgressInfo = styled('h5')`
  display: none;

  @media ${ScreenSize.TABLET} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

function ProgressTracking({ streak, total }: ProgressType) {
  return (
    <StyledProgressTracking>
      <StyledProgressList>
        {makeEmptyArrayWithIds(total).map((item, i) => (
          <StyledProgressItem
            key={item.key}
            $type={i < streak ? 'fullfilled' : 'empty'}
          />
        ))}
      </StyledProgressList>
      <StyledProgressInfo>
        {streak} of {total}
      </StyledProgressInfo>
    </StyledProgressTracking>
  );
}

export default ProgressTracking;
