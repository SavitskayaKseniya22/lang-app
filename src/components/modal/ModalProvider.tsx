/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { ChildrenProps } from '../../interfaces';
import Modal from './Modal';
import ModalContext from './ModalContext';

function ModalProvider({ children }: { children: ChildrenProps }) {
  const [content, setContent] = useState<ChildrenProps | null>(null);

  return (
    <ModalContext.Provider
      value={{
        content,
        setContent,
      }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}

export default ModalProvider;
