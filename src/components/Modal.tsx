import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ChildrenProps } from '../interfaces';

function ReactPortal({ children }: { children: ChildrenProps }) {
  return createPortal(children, document.body);
}

const StyledModal = styled('div')`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  position: absolute;
  top: 0;
  left: 0;

  .modal__container {
    min-width: 500px;
    min-height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: black;
  }
`;

function Modal({
  isOpen,
  children,
  handleClose,
}: {
  isOpen: boolean;
  children: ChildrenProps;
  handleClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <ReactPortal>
      <StyledModal
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            handleClose();
          }
        }}
      >
        <div className="modal__container">
          <button type="button" onClick={handleClose}>
            Close
          </button>
          {children}
        </div>
      </StyledModal>
    </ReactPortal>
  );
}

export default Modal;
