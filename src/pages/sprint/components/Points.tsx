import React from 'react';
import styled from 'styled-components';
import { PointsType } from '../../../interfaces';

const StyledPoints = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;

  .points__total {
    font-size: 4rem;
  }

  .points__step {
    font-size: 1.5rem;
  }
`;

function Points({ value }: { value: PointsType }) {
  return (
    <StyledPoints>
      <p className="points__step">{`+${value.step}`}</p>
      <p className="points__total">{value.total}</p>
    </StyledPoints>
  );
}

export default Points;
