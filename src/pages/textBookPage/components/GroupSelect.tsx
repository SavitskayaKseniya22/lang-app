/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const StyledGroupSelect = styled('select')`
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
`;

function GroupSelect() {
  const { register } = useFormContext();

  return (
    <StyledGroupSelect {...register('group')}>
      <option value="0">Choose word difficulty - Basic</option>
      <option value="1">Light</option>
      <option value="2">Medium</option>
      <option value="3">Complicated</option>
      <option value="4">Difficult</option>
      <option value="5">Terrific</option>
    </StyledGroupSelect>
  );
}

export default GroupSelect;
