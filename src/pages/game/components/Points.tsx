import React from 'react';
import styled from 'styled-components';
import { PointsType } from '../../../interfaces';

const StyledPointsList = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
`;

const StyledPointsItem = styled('span')<{ $type: 'step' | 'total' }>`
  font-size: ${(props) => (props.$type === 'step' ? '2rem' : '4rem')};
`;

function Points({ step, total }: PointsType) {
  return (
    <StyledPointsList>
      <StyledPointsItem $type="step">{`+${step}`}</StyledPointsItem>
      <StyledPointsItem $type="total">{total}</StyledPointsItem>
    </StyledPointsList>
  );
}

export default Points;
