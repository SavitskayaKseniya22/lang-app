/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { checkColor, checkDisabled } from '../../../utils';
import { ScreenSize, WordBaseValues } from '../../../interfaces';

const StyledPagePicker = styled('div')<{ $groupColor: number }>`
  display: flex;
  gap: 1rem;

  button {
    width: 2rem;
    height: 2rem;
    color: white;
    background-color: ${(props) => checkColor(props.$groupColor)};

    &:disabled {
      background-color: rgba(42, 157, 144, 0.2);
    }

    &.unclickable {
      cursor: auto;
    }
  }

  input {
    display: none;
  }

  @media ${ScreenSize.TABLET} {
    button {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1rem;
    }
  }
`;

function PagePicker() {
  const { register, watch, setValue } = useFormContext();

  const groupValue = watch('group');
  const pageValue = watch('page');

  const borderValues = useRef({ prev: 0, next: 0 });

  useEffect(() => {
    const prev =
      pageValue > WordBaseValues.MINPAGE
        ? pageValue - 1
        : WordBaseValues.MINPAGE;
    const next =
      pageValue < WordBaseValues.MAXPAGE
        ? pageValue + 1
        : WordBaseValues.MAXPAGE;
    borderValues.current = { prev, next };
  }, [pageValue]);

  return (
    <StyledPagePicker $groupColor={groupValue}>
      <input
        {...register('page')}
        type="text"
        value={borderValues.current.prev}
      />
      <button
        disabled={checkDisabled(pageValue, WordBaseValues.MINPAGE)}
        type="button"
        onClick={() => {
          setValue('page', WordBaseValues.MINPAGE);
        }}
      >
        <i className="fa-solid fa-backward-fast" />
      </button>

      <button
        disabled={checkDisabled(pageValue, borderValues.current.prev)}
        type="button"
        onClick={() => {
          setValue('page', borderValues.current.prev);
        }}
      >
        <i className="fa-solid fa-backward" />
      </button>

      <button type="button" className="unclickable">
        {pageValue}
      </button>

      <button
        disabled={checkDisabled(pageValue, borderValues.current.next)}
        type="button"
        onClick={() => {
          setValue('page', borderValues.current.next);
        }}
      >
        <i className="fa-solid fa-forward" />
      </button>

      <button
        disabled={checkDisabled(pageValue, WordBaseValues.MAXPAGE)}
        type="button"
        onClick={() => {
          setValue('page', WordBaseValues.MAXPAGE);
        }}
      >
        <i className="fa-solid fa-forward-fast" />
      </button>
    </StyledPagePicker>
  );
}

export default PagePicker;
