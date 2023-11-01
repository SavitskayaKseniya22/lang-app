/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

function GroupPicker({
  initValues,
}: {
  initValues: {
    page: number;
    group: number;
  };
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: { group: initValues.group.toString() },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<{ group: string }> = (data) => {
    navigate(data.group, {
      state: { group: data.group, page: initValues.page },
    });
  };

  return (
    <StyledGroupPicker>
      <h3>Select difficulty:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {new Array(6).fill(0).map((item, i) => (
            <li key={Math.random()}>
              <input
                {...register('group')}
                type="radio"
                value={i}
                id={`group-${i}`}
              />
              <label htmlFor={`group-${i}`}>{i}</label>
            </li>
          ))}
        </ul>
        <button type="submit">Start the game</button>
      </form>
    </StyledGroupPicker>
  );
}

export default GroupPicker;
