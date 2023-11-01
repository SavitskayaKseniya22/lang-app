import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ChildrenProps } from '../../interfaces';
import ModalContext from './ModalContext';

function ReactPortal({ children }: { children: ChildrenProps }) {
  return createPortal(children, document.body);
}

const StyledModal = styled('div')`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 1rem;
    gap: 0.5rem;
    min-height: 250px;
    min-width: 250px;
    height: auto;
    width: auto;

    .modal-container__button_close {
      align-self: flex-end;
    }
  }
`;

function Modal() {
  const { content, setContent } = useContext(ModalContext);
  if (!content) return null;

  return (
    <ReactPortal>
      <StyledModal
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setContent(null);
          }
        }}
      >
        <div className="modal__container">
          <button
            type="button"
            onClick={() => {
              setContent(null);
            }}
            className="modal-container__button_close"
            title="close"
          >
            <i className="fa-solid fa-xmark" />
          </button>
          {content}
        </div>
      </StyledModal>
    </ReactPortal>
  );
}

export default Modal;
