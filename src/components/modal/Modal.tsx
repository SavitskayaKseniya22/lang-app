import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import ModalContext from './ModalContext';

function ReactPortal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.getElementById('root') as HTMLElement);
}

const StyledModalOuterContainer = styled('div')`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 130;
`;

const StyledModalButton = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  font-size: 2rem;
  z-index: 150;
`;

function Modal() {
  const { content, setContent } = useContext(ModalContext);

  if (!content) return null;

  return (
    <ReactPortal>
      <StyledModalOuterContainer
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setContent(null);
          }
        }}
      >
        <StyledModalButton
          type="button"
          onClick={() => {
            setContent(null);
          }}
          title="Close"
        >
          <i className="fa-solid fa-xmark" />
        </StyledModalButton>
        {content}
      </StyledModalOuterContainer>
    </ReactPortal>
  );
}

export default Modal;
