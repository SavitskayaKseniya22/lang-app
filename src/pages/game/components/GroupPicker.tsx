/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormContext } from 'react-hook-form';
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

function GroupPicker() {
  const { register } = useFormContext();

  return (
    <StyledGroupPicker>
      <h3>Select difficulty:</h3>
      <form>
        {new Array(6).fill(0).map((item, i) => (
          <label htmlFor={`group-choice-${i}`} key={Math.random()}>
            {i}
            <input
              {...register('group-choice')}
              type="radio"
              value={i}
              id={`group-choice-${i}`}
            />
          </label>
        ))}
      </form>
    </StyledGroupPicker>
  );
}

export default GroupPicker;
