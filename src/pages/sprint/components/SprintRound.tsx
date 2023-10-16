/* eslint-disable react/jsx-props-no-spreading */
import React, { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ActiveWordsTypes } from '../../../interfaces';

const StyledSprintRound = styled('form')`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const StyledAnswerList = styled('ul')`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;

  li {
    padding: 1rem;
    color: black;
    text-align: center;

    &:first-child {
      font-size: 4rem;
    }

    &:nth-child(2) {
      font-size: 2rem;
    }
  }
`;

const StyledChoiceList = styled('ul')`
  display: flex;
  padding: 2rem;
  gap: 2rem;
  font-size: 2rem;

  input {
    display: none;
  }

  li {
    background-color: rgb(42, 157, 143);
    color: white;
    text-align: center;

    &.choices_false {
      background-color: rgb(231, 111, 81);
    }

    label {
      display: block;
      width: 250px;
      padding: 1.5rem 2rem;
      cursor: pointer;
    }
  }
`;

function SprintRound({
  handleChange,
  words,
}: {
  handleChange: (e: SyntheticEvent) => void;
  words: ActiveWordsTypes;
}) {
  const { register, handleSubmit, reset } = useForm();

  return (
    <StyledSprintRound onSubmit={handleSubmit(() => {})}>
      <StyledAnswerList>
        <li>{words.first?.word?.word}</li>
        <li>{words.second?.word?.wordTranslate}</li>
      </StyledAnswerList>

      <StyledChoiceList>
        {['false', 'true'].map((item) => (
          <li className={`choices_${item}`} key={item}>
            <label htmlFor={`game-choice-${item}`}>
              {item}
              <input
                {...register('game-choice', {
                  onChange: (e) => {
                    handleChange(e);
                    reset();
                  },
                })}
                type="radio"
                value={item}
                id={`game-choice-${item}`}
              />
            </label>
          </li>
        ))}
      </StyledChoiceList>
    </StyledSprintRound>
  );
}

export default SprintRound;
