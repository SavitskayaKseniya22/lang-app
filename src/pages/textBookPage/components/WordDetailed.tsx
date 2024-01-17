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
  min-width: 288px;
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
  position: relative;

  img {
    max-width: 100%;
    opacity: 0.6;
  }

  .media__audio {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(38, 70, 83);
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
`;

const StyledWordStatusPanel = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
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
      userId: user?.localId || 'localId',
      wordId: wordData.id,
      tokenId: user?.idToken || 'tokenId',
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
      <StyledWordDetailedTitle>
        <h3>{word}</h3>
        <StyledSpan>{transcription}</StyledSpan>
        <h5>{wordTranslate}</h5>
      </StyledWordDetailedTitle>
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
        <div className="media__audio">
          <WordAudio source={wordData.audio} />
        </div>
      </StyledWordDetailedMedia>

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
