import React from 'react';
import styled from 'styled-components';
import Greeting from '../greeting/Greeting';
import { ScreenSize } from '../../interfaces';
import SignInControl from './components/SignInControl';

const StyledProfile = styled('div')`
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.5rem;
  margin-top: auto;

  @media ${ScreenSize.TABLET} {
    flex-direction: column;
    padding-left: 1rem;
  }
`;

function Profile() {
  return (
    <StyledProfile>
      <Greeting />
      <SignInControl />
    </StyledProfile>
  );
}

export default Profile;
