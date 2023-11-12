/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';
import { StyledParagraph, StyledSpan } from '../../../styled/SharedStyles';
import { fetchAndCreateReactImage } from '../../../utils';
import CollectionControlPanel from './CollectionControlPanel';
import Spinner from '../../../components/spinner/Spinner';

const StyledWordDetailed = styled('div')`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  width: 100%;
`;

const StyledWordDetailedTitle = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StyledWordDetailedContent = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

function WordDetailed({ wordData }: { wordData: WordType }) {
  const [image, setImage] = useState<React.ReactElement | null>();

  useEffect(() => {
    fetchAndCreateReactImage(wordData.image).then((imageTemp) => {
      setImage(imageTemp);
    });
  }, [wordData.image]);

  if (!image) {
    return <Spinner />;
  }

  return (
    <StyledWordDetailed>
      <CollectionControlPanel wordData={wordData} />
      {image}
      <audio
        controls
        src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordData.audio}`}
      />
      <StyledWordDetailedTitle>
        <h3>{wordData.word}</h3>
        <StyledSpan>{wordData.transcription}</StyledSpan>
        <h5>{wordData.wordTranslate}</h5>
      </StyledWordDetailedTitle>
      <StyledWordDetailedContent>
        <li>
          <h4>Meanings</h4>
          <StyledParagraph>{wordData.textMeaning}</StyledParagraph>
          <StyledParagraph>{wordData.textMeaningTranslate}</StyledParagraph>
        </li>
        <li>
          <h4>Examples</h4>
          <StyledParagraph>{wordData.textExample}</StyledParagraph>
          <StyledParagraph>{wordData.textExampleTranslate}</StyledParagraph>
        </li>
      </StyledWordDetailedContent>
    </StyledWordDetailed>
  );
}

export default WordDetailed;
