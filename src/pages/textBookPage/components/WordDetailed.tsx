/* eslint-disable jsx-a11y/media-has-caption */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';
import Spinner from '../../../components/spinner/Spinner';

const StyledWordDetailed = styled('div')`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
`;

function WordDetailed({ wordData }: { wordData: WordType }) {
  const [image, setImage] = useState<React.ReactElement | null>();

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordData.image}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.blob();
      })
      .then((response) => {
        const imageTemp = React.createElement('img', {
          src: URL.createObjectURL(response),
        });

        setImage(imageTemp);
      });
  }, [wordData.image]);

  return (
    <StyledWordDetailed>
      {image ? (
        <>
          {image}
          <audio
            src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordData.audio}`}
          />
          <div className="word__content">
            <h3>{wordData.word}</h3>
            <h4>{wordData.transcription}</h4>
            <h3>{wordData.wordTranslate}</h3>
          </div>
          <dl>
            <dt>Meaning - Значение</dt>
            <dd>{wordData.textMeaning}</dd>
            <dd>{wordData.textMeaningTranslate}</dd>

            <dt>Example - Пример использования</dt>
            <dd>{wordData.textExample}</dd>
            <dd>{wordData.textExampleTranslate}</dd>
          </dl>
        </>
      ) : (
        <Spinner />
      )}
    </StyledWordDetailed>
  );
}

export default WordDetailed;
