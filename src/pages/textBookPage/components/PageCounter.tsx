/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { StyledButton } from '../../../styled/SharedStyles';
import { checkDisabled } from '../../../utils';

const StyledGroupNumbers = styled('ul')<{ $groupColor: number }>`
  display: flex;
  gap: 1rem;

  li {
    ${StyledButton}
  }

  button:disabled {
    background-color: gray;
  }

  input {
    display: none;
  }
`;

function PageCounter() {
  const { register, watch, setValue } = useFormContext();

  const groupValue = watch('group');
  const pageValue = watch('page');

  const extremumValues = useRef({ prev: 0, next: 0 });

  useEffect(() => {
    const prev = pageValue > 0 ? pageValue - 1 : 0;
    const next = pageValue < 29 ? pageValue + 1 : 29;
    extremumValues.current = { prev, next };
  }, [pageValue]);

  return (
    <StyledGroupNumbers $groupColor={groupValue}>
      <li>
        <button
          disabled={checkDisabled(pageValue, 0)}
          type="button"
          onClick={() => {
            setValue('page', 0);
          }}
        >
          <i className="fa-solid fa-backward-fast" />
        </button>
      </li>

      <li>
        <button
          disabled={checkDisabled(pageValue, extremumValues.current.prev)}
          type="button"
          onClick={() => {
            setValue('page', extremumValues.current.prev);
          }}
        >
          <i className="fa-solid fa-backward" />
        </button>
      </li>

      <li>
        <input
          {...register('page')}
          type="text"
          value={extremumValues.current.prev}
        />
        {pageValue}
      </li>

      <li>
        <button
          disabled={checkDisabled(pageValue, extremumValues.current.next)}
          type="button"
          onClick={() => {
            setValue('page', extremumValues.current.next);
          }}
        >
          <i className="fa-solid fa-forward" />
        </button>
      </li>

      <li>
        <button
          disabled={checkDisabled(pageValue, 29)}
          type="button"
          onClick={() => {
            setValue('page', 29);
          }}
        >
          <i className="fa-solid fa-forward-fast" />
        </button>
      </li>
    </StyledGroupNumbers>
  );
}

export default PageCounter;
