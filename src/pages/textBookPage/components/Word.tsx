/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { NumberDivisibility, ScreenSize, WordType } from '../../../interfaces';
import WordDetailed from './WordDetailed';
import ModalContext from '../../../components/modal/ModalContext';

const StyledWord = styled('li')<{ $type: NumberDivisibility }>`
  cursor: pointer;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 3;
  max-height: 120px;

  background-color: ${(props) =>
    props.$type === NumberDivisibility.ODD
      ? 'rgba(233, 197, 106, 0.2)'
      : 'rgba(42, 157, 144, 0.2)'};

  p {
    color: ${(props) =>
      props.$type === NumberDivisibility.ODD
        ? 'rgb(42, 157, 143)'
        : 'rgb(233, 196, 106)'};
  }

  @media ${ScreenSize.TABLET} {
    padding: 1.5rem;
  }
`;

function Word({
  wordData,
  type,
}: {
  wordData: WordType;
  type: NumberDivisibility;
}) {
  const { setContent } = useContext(ModalContext);

  return (
    <StyledWord
      $type={type}
      onClick={() => {
        setContent(<WordDetailed wordData={wordData} />);
      }}
    >
      <h4>{wordData.word}</h4>
      <p>{wordData.transcription}</p>
      <h5>{wordData.wordTranslate}</h5>
    </StyledWord>
  );
}

export default Word;
