import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import { capitalize } from '../../utils';

const StyledGreeting = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

function Greeting() {
  const { user } = useAppSelector((state) => state.persist.auth);

  return (
    <StyledGreeting>
      <span>Hello, </span>
      <span>{(user?.name && capitalize(user?.name)) || 'Stranger'}!</span>
    </StyledGreeting>
  );
}

export default Greeting;
