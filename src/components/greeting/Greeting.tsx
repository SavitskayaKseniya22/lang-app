import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import { capitalize } from '../../utils';

const StyledGreeting = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.5rem 0 0 1.5rem;
  background-color: white;
  padding: 1rem;

  width: 100%;

  .greeting__name {
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(231, 111, 81);
  }
`;

function Greeting() {
  const { user } = useAppSelector((state) => state.persist.auth);

  return (
    <StyledGreeting>
      <span>Hello, </span>
      <span className="greeting__name">
        {(user?.name && capitalize(user.name)) || 'Stranger'}!
      </span>
    </StyledGreeting>
  );
}

export default Greeting;
