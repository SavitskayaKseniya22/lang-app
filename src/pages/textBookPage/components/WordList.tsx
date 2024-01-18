import React from 'react';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';
import Word from './Word';

const StyledWordList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

function WordList({ data }: { data: WordType[] }) {
  return (
    <StyledWordList>
      {data.map((word, index) => (
        <Word
          wordData={word}
          key={word.id}
          modifier={{
            isItOdd: !!(index % 2),
          }}
        />
      ))}
    </StyledWordList>
  );
}

export default WordList;
