import React from 'react';
import styled from 'styled-components';
import { resetUser } from '../../../store/auth/authSlice';
import { useAppSelector, useAppDispatch } from '../../../store/store';

const StyledSignInControl = styled('button')`
  padding: 0.5rem 1.5rem;
  background-color: white;
  border-radius: 1.5rem 0 0 1.5rem;
`;

function SignInControl() {
  const { user } = useAppSelector((state) => state.persist.auth);
  const dispatch = useAppDispatch();

  return user ? (
    <StyledSignInControl
      type="button"
      onClick={() => {
        dispatch(resetUser());
      }}
    >
      Log out
    </StyledSignInControl>
  ) : (
    <StyledSignInControl
      type="button"
      onClick={() => {
        // setIsOpen(true);
      }}
    >
      Sign in
    </StyledSignInControl>
  );
}

export default SignInControl;
