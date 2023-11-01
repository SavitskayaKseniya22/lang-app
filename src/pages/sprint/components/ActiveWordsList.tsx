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
  padding: 1rem;
  gap: 1rem;
  flex-grow: 11;
  text-align: center;

  .audible {
    cursor: pointer;
  }

  audio {
    display: none;
    color: red;
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
            <h2>{words.first.word.word}</h2>
          </li>
          <li>
            <h4>{words.second.word.wordTranslate}</h4>
          </li>
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
