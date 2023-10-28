import React, { useState } from 'react';
import styled from 'styled-components';
import Greeting from '../greeting/Greeting';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { resetUser } from '../../store/auth/authSlice';
import Auth from '../auth/Auth';

const StyledProfile = styled('div')`
  padding: 1rem 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.5rem;

  margin-top: auto;

  button {
    padding: 0.5rem 2rem;
    background-color: white;
    border-radius: 1.5rem 0 0 1.5rem;
  }
`;

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.persist.auth);
  const dispatch = useAppDispatch();

  return (
    <StyledProfile>
      <Greeting />
      {user ? (
        <button
          type="button"
          onClick={() => {
            dispatch(resetUser());
          }}
        >
          Log out
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Sign in
        </button>
      )}

      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      >
        <Auth
          doAfterSubmit={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </StyledProfile>
  );
}

export default Profile;
