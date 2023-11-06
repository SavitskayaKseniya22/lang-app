/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { makeEmptyArrayWithIds } from '../../../utils';

const StyledGroupPicker = styled('div')`
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

  label {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgb(42, 157, 143);
  }

  input {
    display: none;

    &:checked + label {
      background-color: white;
      color: rgb(42, 157, 143);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ul {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  }
`;

function GroupPicker() {
  const { register, handleSubmit } = useForm({
    defaultValues: { group: '0' },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<{ group: string }> = (data) => {
    navigate('game', {
      state: { group: data.group },
    });
  };

  return (
    <StyledGroupPicker>
      <h3>Select difficulty:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {makeEmptyArrayWithIds(6).map((item) => (
            <li key={item.key}>
              <input
                {...register('group')}
                type="radio"
                value={item.element}
                id={`group-${item.key}`}
              />
              <label htmlFor={`group-${item.key}`}>{item.element}</label>
            </li>
          ))}
        </ul>
        <button type="submit">Start the game</button>
      </form>
    </StyledGroupPicker>
  );
}

export default GroupPicker;
