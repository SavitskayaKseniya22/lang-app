/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ScreenSize, WordType } from '../../../interfaces';
import Suspended from '../../../components/Suspended';
import { StyledParagraph, StyledSpan } from '../../../styled/SharedStyles';

const StyledWordDetailed = styled('div')`
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 280px;

  image {
    width: 100%;
  }

  @media ${ScreenSize.LAPTOPS} {
    max-width: 450px;
  }
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
  gap: 1rem;

  li {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media ${ScreenSize.LAPTOPS} {
    flex-direction: row;
  }
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
    <Suspended condition={!!image}>
      <StyledWordDetailed>
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
    </Suspended>
  );
}

export default WordDetailed;
