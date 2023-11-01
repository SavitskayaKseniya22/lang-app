/* eslint-disable react/jsx-props-no-spreading */
import React, { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledChoiceList = styled('ul')`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }

  li {
    color: white;
    text-align: center;
    flex-grow: 2;

    &.choices_false {
      background-color: rgb(231, 111, 81);
    }

    &.choices_true {
      background-color: rgb(42, 157, 143);
    }

    label {
      display: block;
      padding: 1rem 2rem;
      cursor: pointer;
      font-size: 1.5rem;
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
    <form onSubmit={handleSubmit(() => {})}>
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
    </form>
  );
}

export default SprintRound;
