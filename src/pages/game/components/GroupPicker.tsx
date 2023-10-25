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

  input {
    display: none;
  }

  form {
    display: flex;
    gap: 1rem;
  }

  label {
    cursor: pointer;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
    background-color: rgb(232, 95, 76);
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
        {new Array(6).fill(0).map((item, i) => (
          <label htmlFor={`group-${i}`} key={Math.random()}>
            {i}
            <input
              {...register('group')}
              type="radio"
              value={i}
              id={`group-${i}`}
            />
          </label>
        ))}
        <button type="submit">Start the game</button>
      </form>
    </StyledGroupPicker>
  );
}

export default GroupPicker;
