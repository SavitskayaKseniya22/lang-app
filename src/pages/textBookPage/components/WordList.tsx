import React from 'react';
import styled from 'styled-components';
import { NumberDivisibility, WordType } from '../../../interfaces';
import Word from './Word';

const StyledWordList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`;

function WordList({ data }: { data: WordType[] }) {
  return (
    <StyledWordList>
      {data.map((word, index) => (
        <Word
          wordData={word}
          key={word.id}
          type={index % 2 ? NumberDivisibility.ODD : NumberDivisibility.EVEN}
        />
      ))}
    </StyledWordList>
  );
}

export default WordList;
