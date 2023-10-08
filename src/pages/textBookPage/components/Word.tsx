/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';

const StyledWord = styled('li')<{ $type: 'odd' | 'even' }>`
  width: 320px;

  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  img {
    order: ${(props) => (props.$type === 'odd' ? 0 : 1)};
  }

  .word__content {
    order: ${(props) => (props.$type === 'odd' ? 1 : 0)};
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .content__titles {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      text-align: center;
      hr {
        width: 3rem;
      }
    }

    dt {
      margin: 0.5rem;
      font-weight: bold;
      font-style: italic;
      background-color: rgba(42, 157, 143);
      padding: 0.5rem;
      border-radius: 0.5rem;
      color: white;
    }

    dd {
      background-color: gainsboro;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }

    input {
      display: none;
    }

    input:checked + label {
      display: none;
    }

    label {
      cursor: pointer;
    }
  }
`;

function Word({
  wordData,
  type,
}: {
  wordData: WordType;
  type: 'odd' | 'even';
}) {
  return (
    <StyledWord $type={type}>
      <img
        src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordData.image}`}
        alt={wordData.word}
      />

      <audio
        src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordData.audio}`}
      />
      <div className="word__content">
        <div className="content__titles">
          <h3>{wordData.word}</h3>
          <hr />
          <h4>{wordData.transcription}</h4>
          <hr />
          <h3>{wordData.wordTranslate}</h3>
        </div>

        <dl>
          <dt>Meaning - Значение</dt>
          <dd>
            <input
              type="radio"
              name={`lang-${wordData.id}`}
              id={`lang-en-${wordData.id}`}
            />
            <label htmlFor={`lang-en-${wordData.id}`}>
              {wordData.textMeaning}
            </label>
            <input
              type="radio"
              name={`lang-${wordData.id}`}
              id={`lang-ru-${wordData.id}`}
              defaultChecked
            />
            <label htmlFor={`lang-ru-${wordData.id}`}>
              {wordData.textMeaningTranslate}
            </label>
          </dd>

          <dt>Example - Пример использования</dt>
          <dd>
            <input
              type="radio"
              name={`example-${wordData.id}`}
              id={`example-en-${wordData.id}`}
            />
            <label htmlFor={`example-en-${wordData.id}`}>
              {wordData.textExample}
            </label>
            <input
              type="radio"
              name={`example-${wordData.id}`}
              id={`example-ru-${wordData.id}`}
              defaultChecked
            />
            <label htmlFor={`example-ru-${wordData.id}`}>
              {wordData.textExampleTranslate}
            </label>
          </dd>
        </dl>
      </div>
    </StyledWord>
  );
}

export default Word;
