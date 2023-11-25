/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyledGameContainer, StyledMain } from '../../../styled/SharedStyles';
import { DataQueue } from '../../../utils';
import { StyledPuzzlesGameAnswer } from '../../sentences/components/PuzzlesGame';
import { ChildrenProps } from '../../../interfaces';
import GameInfo from '../../game/components/GameInfo';
import Points from '../../game/components/Points';
import ProgressTracking from '../../game/components/ProgressTracking';

const StyledForm = styled('form')`
  width: 100%;
`;

export const StyledActiveLetter = css<{ $type: 'disabled' | 'active' }>`
  border-radius: 1rem;
  color: white;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  text-align: center;
`;

const StyledButtonList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StyledConstructorButton = styled('button')<{
  $type: 'disabled' | 'active';
}>`
  ${StyledActiveLetter}
  background-color: ${(props) =>
    props.$type === 'active' ? 'rgb(231, 111, 81)' : 'gainsboro'};
  width: 4rem;
  height: 3rem;
  font-size: 1rem;
`;

const StyledInputList = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  flex-wrap: nowrap;
  max-width: 100vw;
`;

const StyledInput = styled('input')<{ $type: 'disabled' | 'active' }>`
  ${StyledActiveLetter};
  background-color: ${(props) =>
    props.$type === 'active' ? 'rgba(38, 70, 83)' : 'gainsboro'};
  border-radius: 0.5rem;
  min-width: 1rem;
  max-width: 3rem;
  min-height: 2rem;
`;

export function ConstructorButton({
  children,
  addToClick,
}: {
  children: ChildrenProps;
  addToClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);
  return (
    <StyledConstructorButton
      $type={disabled ? 'disabled' : 'active'}
      type="button"
      disabled={disabled}
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
  const updater = useCallback(() => data.nextWordLikeArray(), [data]);

  const [word, setWord] = useState(updater);

  const [middleResult, setMiddleResult] = useState<null | boolean>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, reset, setValue } = useForm<{
    [key: string]: string;
  }>();

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (e) => {
    const resultWord = Object.values(e).join('');
    setMiddleResult(resultWord === word.word);
  };

  return (
    <StyledMain>
      <GameInfo>
        <ProgressTracking streak={data.head} total={data.startLength} />
        <Points step={10} total={10} />
      </GameInfo>
      <StyledGameContainer>
        {middleResult !== null ? (
          <>
            <StyledPuzzlesGameAnswer $type={middleResult ? 'correct' : 'wrong'}>
              {word.word} - {word.wordTranslate}
            </StyledPuzzlesGameAnswer>

            <p>{word.textMeaning}</p>

            <button
              type="button"
              onClick={() => {
                if (data.isEmpty) {
                  navigate('/games/constructor/result');
                } else {
                  reset();
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
            <h4>{word.textMeaning}</h4>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <StyledInputList>
                {word.letters.map((item) => (
                  <StyledInput
                    $type={getValues(String(item.key)) ? 'active' : 'disabled'}
                    type="text"
                    key={item.key}
                    {...register(String(item.key), {
                      pattern: /^\w{1}$/gi,
                    })}
                  />
                ))}
              </StyledInputList>

              <StyledButtonList>
                {word.letters.map((item) => (
                  <ConstructorButton
                    key={item.key}
                    addToClick={() => {
                      const formValues = getValues();

                      // eslint-disable-next-line no-restricted-syntax
                      for (const formValue of Object.keys(formValues)) {
                        if (formValues[formValue] === '') {
                          setValue(formValue, item.letter);
                          break;
                        }
                      }
                    }}
                  >
                    {item.letter}
                  </ConstructorButton>
                ))}
              </StyledButtonList>

              <input type="submit" value="See the correct answer" />
            </StyledForm>
          </>
        )}
      </StyledGameContainer>
    </StyledMain>
  );
}

export default ConstructorGame;

/* onClick={() => {
            // setMiddleResult(false);
            
          dispatch(
            updateAudiocallResult({
              isAnswerCorrect: false,
              word: words.ref,
            })
          ); 
          }} */
