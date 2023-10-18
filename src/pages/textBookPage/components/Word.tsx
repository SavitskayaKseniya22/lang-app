/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import { NumberDivisibility, WordType } from '../../../interfaces';
import Modal from '../../../components/Modal';
import WordDetailed from './WordDetailed';

const StyledWord = styled('li')<{ $type: NumberDivisibility }>`
  min-width: 300px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  text-align: center;
  background-color: gainsboro;
  flex-wrap: wrap;
  flex-grow: 22;
  background-color: ${(props) =>
    props.$type === NumberDivisibility.ODD
      ? 'rgb(233, 196, 106)'
      : 'rgb(42, 157, 143)'};

  h4 {
    color: ${(props) =>
      props.$type === NumberDivisibility.ODD
        ? 'rgb(42, 157, 143)'
        : 'rgb(233, 196, 106)'};
  }
`;

function Word({
  wordData,
  type,
}: {
  wordData: WordType;
  type: NumberDivisibility;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledWord
        $type={type}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <h3>{wordData.word}</h3>
        <h4>{wordData.transcription}</h4>
        <h3>{wordData.wordTranslate}</h3>
      </StyledWord>

      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      >
        <WordDetailed wordData={wordData} />
      </Modal>
    </>
  );
}

export default Word;
