/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { makeEmptyArrayWithIds } from '../../../utils';

const StyledGroupPicker = styled('div')`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  align-items: center;

  input {
    display: none;

    &:checked + label {
      background-color: white;
      color: rgb(42, 157, 143);
    }
  }

  label {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgb(42, 157, 143);
    font-size: 1.25rem;
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
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
    <StyledGroupPicker onSubmit={handleSubmit(onSubmit)}>
      <h3>Select difficulty:</h3>
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
    </StyledGroupPicker>
  );
}

export default GroupPicker;
