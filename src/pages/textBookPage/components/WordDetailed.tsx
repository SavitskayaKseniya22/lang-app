import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';
import { StyledParagraph, StyledSpan } from '../../../styled/SharedStyles';
import { fetchAndCreateReactImage } from '../../../utils';
import CollectionControlPanel from './CollectionControlPanel';
import Spinner from '../../../components/spinner/Spinner';
import { useAppSelector } from '../../../store/store';
import { useGetUserWordQuery } from '../../../store/userWordsApi';
import WordProgress from './WordProgress';
import WordAudio from './WordAudio';

const StyledWordDetailed = styled('div')`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-width: 288px;
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

const StyledWordStatusPanel = styled('div')`
  display: flex;
`;

function WordDetailed({ wordData }: { wordData: WordType }) {
  const [image, setImage] = useState<React.ReactElement | null>();
  const { user } = useAppSelector((state) => state.persist.auth);

  const {
    data: wordDataDetailed,
    isSuccess,
    isLoading,
  } = useGetUserWordQuery(
    {
      userId: user!.localId,
      wordId: wordData.id,
      tokenId: user!.idToken,
    },
    { skip: !user }
  );

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

  if (!image || isLoading) {
    return <Spinner />;
  }

  return (
    <StyledWordDetailed>
      {user && isSuccess && (
        <StyledWordStatusPanel>
          <CollectionControlPanel
            wordData={wordData}
            wordDataDetailed={wordDataDetailed}
          />
          <WordProgress wordDataDetailed={wordDataDetailed} />
        </StyledWordStatusPanel>
      )}

      <StyledWordDetailedMedia>
        {image}
        <WordAudio source={wordData.audio} />
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
