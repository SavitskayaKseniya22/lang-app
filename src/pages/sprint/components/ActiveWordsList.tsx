import React from 'react';
import styled from 'styled-components';
import { ActiveWordsTypes } from '../../../interfaces';
import Suspended from '../../../components/Suspended';

const StyledActiveWordsList = styled('ul')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  flex-grow: 11;

  li {
    padding: 1rem;
    color: black;
    text-align: center;

    &:first-child {
      font-size: 4rem;
    }

    &:nth-child(2) {
      font-size: 2rem;
    }
  }
`;

function ActiveWordsList({ words }: { words: ActiveWordsTypes | null }) {
  return (
    <StyledActiveWordsList>
      <Suspended condition={!!(words && words.first && words.second)}>
        <li>{words?.first?.word?.word}</li>
        <li>{words?.second?.word?.wordTranslate}</li>
      </Suspended>
    </StyledActiveWordsList>
  );
}

export default ActiveWordsList;
