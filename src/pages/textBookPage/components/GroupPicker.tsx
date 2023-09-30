/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { StyledButton } from '../../../styled/SharedStyles';
import { TextBookPageContext } from '../../../contexts/TextBookPageContext';

const StyledGroupNumbers = styled('ul')<{ $groupColor: number }>`
  display: flex;
  gap: 1rem;

  label {
    ${StyledButton}
  }

  input {
    display: none;
  }
`;

function GroupPicker() {
  const { register, getValues } = useForm({
    defaultValues: {
      group: 0,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const context = useContext(TextBookPageContext);

  const onChange = () => {
    const value = getValues('group');
    context.setTextBookValues({
      ...context.textBookValues,
      group: value,
    });
  };

  return (
    <form onSubmit={() => {}} onChange={onChange}>
      <StyledGroupNumbers $groupColor={context.textBookValues.group}>
        <li>
          <label htmlFor="0">
            <input {...register('group')} type="radio" value="0" id="0" />0
          </label>
        </li>
        <li>
          <label htmlFor="1">
            <input {...register('group')} type="radio" value="1" id="1" />1
          </label>
        </li>
        <li>
          <label htmlFor="2">
            <input {...register('group')} type="radio" value="2" id="2" />2
          </label>
        </li>
        <li>
          <label htmlFor="3">
            <input {...register('group')} type="radio" value="3" id="3" />3
          </label>
        </li>
        <li>
          <label htmlFor="4">
            <input {...register('group')} type="radio" value="4" id="4" />4
          </label>
        </li>
        <li>
          <label htmlFor="5">
            <input {...register('group')} type="radio" value="5" id="5" />5
          </label>
        </li>
      </StyledGroupNumbers>
    </form>
  );
}

export default GroupPicker;
