import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { StyledGameContainer, StyledMain } from '../../../styled/SharedStyles';
import { DataQueue } from '../../../utils';
import { StyledPuzzlesGameAnswer } from '../../sentences/components/PuzzlesGame';
import GameInfo from '../../game/components/GameInfo';
import Points from '../../game/components/Points';
import ProgressTracking from '../../game/components/ProgressTracking';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateConstructorResult } from '../../../store/ResultSlice';
import StopWatch from '../../game/components/StopWatch';

export const StyledActiveLetter = css<{ $type: 'disabled' | 'active' }>`
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledButtonList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const StyledConstructorButton = styled('button')<{
  $type: 'disabled' | 'active';
}>`
  ${StyledActiveLetter}
  background-color: ${(props) =>
    props.$type === 'active' ? 'rgb(231, 111, 81)' : 'gainsboro'};
  width: 3rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const StyledList = styled('ul')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  flex-wrap: nowrap;
  width: 100%;
`;

const StyledItem = styled('li')<{ $type: 'disabled' | 'active' }>`
  ${StyledActiveLetter};
  background-color: ${(props) =>
    props.$type === 'active' ? 'rgba(38, 70, 83)' : 'gainsboro'};
  border-radius: 0.25rem;
  width: 1.5rem;
  height: 1.25rem;
  font-size: 0.75rem;
`;

export function ConstructorButton({
  children,
  addToClick,
}: {
  children: React.ReactNode;
  addToClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);

  return (
    <StyledConstructorButton
      $type={disabled ? 'disabled' : 'active'}
      type="button"
      onClick={() => {
        setDisabled((a) => !a);
        addToClick();
      }}
    >
      {children}
    </StyledConstructorButton>
  );
}

function ConstructorGame({ data }: { data: DataQueue }) {
  const { constructor } = useAppSelector((state) => state.resultsReducer);

  const updater = useCallback(() => {
    const wordData = data.nextWordLikeArray();
    return {
      ...wordData,
      pressedButtons: wordData.letters.map(() => ({
        letter: '',
        key: Math.random(),
        index: -1,
      })),
    };
  }, [data]);

  const [word, setWord] = useState(updater);

  const [middleResult, setMiddleResult] = useState<null | boolean>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <StyledMain>
      <GameInfo>
        <ProgressTracking streak={data.head} total={data.startLength} />
        <Points step={constructor.step} total={constructor.total} />
      </GameInfo>
      <StopWatch doAfterTimer={() => {}} />
      <StyledGameContainer>
        <h4>{word.wordTranslate}</h4>
        {middleResult !== null ? (
          <>
            <StyledPuzzlesGameAnswer $type={middleResult ? 'correct' : 'wrong'}>
              <s>{word.pressedButtons.map((item) => item.letter).join('')}</s> -{' '}
              {word.word} - {word.wordTranslate}
            </StyledPuzzlesGameAnswer>

            <button
              type="button"
              onClick={() => {
                if (data.isEmpty) {
                  navigate('/games/constructor/result');
                } else {
                  setWord(updater);
                  setMiddleResult(null);
                }
              }}
            >
              Next word
            </button>
          </>
        ) : (
          <>
            <StyledList>
              {word.pressedButtons.map((item) => (
                <StyledItem
                  $type={item.letter ? 'active' : 'disabled'}
                  key={item.key}
                >
                  {item.letter}
                </StyledItem>
              ))}
            </StyledList>

            <StyledButtonList>
              {word.shuffledLetters.map((item) => (
                <ConstructorButton
                  key={item.key}
                  addToClick={() => {
                    const indexIn = word.pressedButtons.findIndex(
                      (elem) => elem.index === item.index
                    );

                    const copyPressedButtons = [...word.pressedButtons];

                    if (indexIn !== -1) {
                      copyPressedButtons[indexIn] = {
                        ...copyPressedButtons[indexIn],
                        letter: '',
                        index: -1,
                      };
                    } else {
                      const emptyindexIn = word.pressedButtons.findIndex(
                        (elem) => elem.index === -1
                      );

                      copyPressedButtons[emptyindexIn] = { ...item };
                    }
                    setWord({
                      ...word,
                      pressedButtons: [...copyPressedButtons],
                    });
                  }}
                >
                  {item.letter}
                </ConstructorButton>
              ))}
            </StyledButtonList>
            <button
              type="button"
              onClick={() => {
                const isAnswerCorrect =
                  word.pressedButtons.map((item) => item.letter).join('') ===
                  word.word;
                setMiddleResult(isAnswerCorrect);
                dispatch(
                  updateConstructorResult({
                    isAnswerCorrect,
                    word,
                  })
                );
              }}
            >
              See the correct answer
            </button>
          </>
        )}
      </StyledGameContainer>
    </StyledMain>
  );
}

export default ConstructorGame;
