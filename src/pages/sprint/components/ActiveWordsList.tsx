/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */

import React, { useRef } from 'react';
import styled from 'styled-components';
import { ActiveWordsTypes } from '../../../interfaces';

const StyledActiveWordsList = styled('ul')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  flex-grow: 11;

  audio {
    display: none;
    color: red;
  }

  li {
    padding: 1rem;
    color: black;
    text-align: center;

    &.audible {
      font-size: 4rem;
      cursor: pointer;
    }

    &:nth-child(2) {
      font-size: 2rem;
    }
  }
`;

function ActiveWordsList({ words }: { words: ActiveWordsTypes | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <StyledActiveWordsList>
      {words && (
        <>
          <li
            title="listen"
            className="audible"
            onClick={() => {
              audioRef.current?.play();
            }}
          >
            {words.first.word.word}
          </li>
          <li>{words.second.word.wordTranslate}</li>
          <audio
            ref={audioRef}
            controls
            src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words.first.word.audio}`}
          />
        </>
      )}
    </StyledActiveWordsList>
  );
}

export default ActiveWordsList;
