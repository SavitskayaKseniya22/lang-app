/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { StyledButton } from '../../../styled/SharedStyles';
import checkColor from '../../../utils';
import { TextBookPageContext } from '../../../contexts/TextBookPageContext';

const StyledPageCounter = styled('div')<{ $groupColor: number }>`
  display: flex;
  gap: 0.5rem;

  input {
    border: ${(props) => `2px solid ${checkColor(props.$groupColor)}`};
  }

  button {
    ${StyledButton}
  }
`;

function PageCounter() {
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const pageNamberValue = watch('page');

  const context = useContext(TextBookPageContext);

  useEffect(() => {
    context.setTextBookValues({
      ...context.textBookValues,
      page: pageNamberValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNamberValue]);

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <StyledPageCounter $groupColor={context.textBookValues.group}>
        <button
          type="button"
          onClick={() => {
            const decreasedValue = +getValues('page') - 1;
            if (decreasedValue >= 0) {
              setValue('page', decreasedValue, { shouldTouch: true });
            }
          }}
        >
          -
        </button>
        <input
          type="number"
          placeholder="page"
          max={29}
          min={0}
          defaultValue={0}
          {...register('page', { required: true, max: 29, min: 0 })}
        />

        <button
          type="button"
          onClick={() => {
            const increasedValue = +getValues('page') + 1;
            if (increasedValue <= 29) {
              setValue('page', increasedValue);
            }
          }}
        >
          +
        </button>
      </StyledPageCounter>
    </form>
  );
}

export default PageCounter;
