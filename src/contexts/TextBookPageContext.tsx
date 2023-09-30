import { createContext } from 'react';

export type TextBookValuesTypes = { group: number; page: number };

export type TextBookPageContextTypes = {
  textBookValues: TextBookValuesTypes;
  setTextBookValues: React.Dispatch<React.SetStateAction<TextBookValuesTypes>>;
};

export const initialTextBookValues = {
  group: 0,
  page: 0,
};

export const TextBookPageContext = createContext(
  {} as TextBookPageContextTypes
);
