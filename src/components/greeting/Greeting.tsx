import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import { capitalize } from '../../utils';
import { ScreenSize } from '../../interfaces';

const StyledGreeting = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0 1.5rem 1.5rem 0;
  background-color: white;
  padding: 0.5rem 1rem;
  flex-grow: 3;

  .greeting__name {
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(231, 111, 81);
  }

  @media ${ScreenSize.TABLET} {
    padding: 1rem;
    border-radius: 1.5rem 0 0 1.5rem;
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
