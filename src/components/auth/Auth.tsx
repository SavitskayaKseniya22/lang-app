import React, { useState } from 'react';
import styled from 'styled-components';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const StyledAuthContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

function Auth() {
  const [authFormType, setAuthFormType] = useState<'signin' | 'signup'>(
    'signin'
  );

  return (
    <StyledAuthContainer>
      {authFormType === 'signin' ? (
        <>
          <SignIn />
          <button
            type="button"
            onClick={() => {
              setAuthFormType('signup');
            }}
          >
            Make new user
          </button>
        </>
      ) : (
        <>
          <SignUp />
          <button
            type="button"
            onClick={() => {
              setAuthFormType('signin');
            }}
          >
            Log in if you are already registered
          </button>
        </>
      )}
    </StyledAuthContainer>
  );
}

export default Auth;
