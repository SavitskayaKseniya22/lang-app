import React, { useState } from 'react';
import styled from 'styled-components';
import Greeting from '../greeting/Greeting';
import Modal from '../Modal';
import Auth from '../auth/Auth';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledProfile>
      <Greeting />
      <SignInControl />

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
