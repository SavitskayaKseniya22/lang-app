/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import { NumberDivisibility, WordType } from '../../../interfaces';
import Word from './Word';

const StyledWordList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
`;

function WordList({ data }: { data: WordType[] }) {
  return (
    <StyledWordList>
      {data &&
        data.map((word, index) => (
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
