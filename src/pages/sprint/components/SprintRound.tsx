/* eslint-disable react/jsx-props-no-spreading */
import React, { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledSprintRound = styled('form')`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
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
}: {
  handleChange: (e: SyntheticEvent) => void;
}) {
  const { register, handleSubmit, reset } = useForm();

  return (
    <StyledSprintRound onSubmit={handleSubmit(() => {})}>
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
