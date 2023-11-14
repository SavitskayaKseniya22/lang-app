/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';
import { StyledParagraph, StyledSpan } from '../../../styled/SharedStyles';
import { fetchAndCreateReactImage } from '../../../utils';
import CollectionControlPanel from './CollectionControlPanel';
import Spinner from '../../../components/spinner/Spinner';
import { useAppSelector } from '../../../store/store';

const StyledWordDetailed = styled('div')`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 300px;
  min-width: 300px;
  max-height: 80vh;
  max-width: 70vw;
  padding: 1rem;
`;

const StyledWordDetailedTitle = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StyledWordDetailedMedia = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  img {
    max-width: 50%;
  }
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

  h4 {
    background-color: rgba(38, 70, 83);
    padding: 0.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    margin-right: 0.5rem;
  }
`;

function WordDetailed({ wordData }: { wordData: WordType }) {
  const [image, setImage] = useState<React.ReactElement | null>();
  const { user } = useAppSelector((state) => state.persist.auth);

  const {
    word,
    transcription,
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    wordTranslate,
  } = wordData;

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
      {user && (
        <CollectionControlPanel wordData={wordData} userId={user.localId} />
      )}

      <StyledWordDetailedMedia>
        {image}
        <button type="button">Play</button>
        <audio
          src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordData.audio}`}
        />
      </StyledWordDetailedMedia>

      <StyledWordDetailedTitle>
        <h3>{word}</h3>
        <StyledSpan>{transcription}</StyledSpan>
        <h5>{wordTranslate}</h5>
      </StyledWordDetailedTitle>

      <StyledWordDetailedContent>
        <li>
          <h4>Meanings</h4>
          <StyledParagraph>{textMeaning}</StyledParagraph>
          <StyledParagraph>{textMeaningTranslate}</StyledParagraph>
        </li>
        <li>
          <h4>Examples</h4>
          <StyledParagraph>{textExample}</StyledParagraph>
          <StyledParagraph>{textExampleTranslate}</StyledParagraph>
        </li>
      </StyledWordDetailedContent>
    </StyledWordDetailed>
  );
}

export default WordDetailed;
