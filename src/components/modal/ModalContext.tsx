import { createContext } from 'react';
import { ChildrenProps } from '../../interfaces';

const ModalContext = createContext<{
  content: ChildrenProps | null;
  setContent: React.Dispatch<React.SetStateAction<ChildrenProps | null>>;
}>(
  {} as {
    content: ChildrenProps | null;
    setContent: React.Dispatch<React.SetStateAction<ChildrenProps | null>>;
  }
);

export default ModalContext;
