/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { checkDisabled } from '../../../utils';
import { WordBaseValues } from '../../../interfaces';
import PagePickerButton from './PagePickerButton';

const StyledPagePicker = styled('div')`
  display: flex;
  gap: 1rem;

  input {
    display: none;
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
    <StyledPagePicker>
      <input
        {...register('page')}
        type="text"
        value={borderValues.current.prev}
      />
      <PagePickerButton
        $groupColor={groupValue}
        isDisabled={checkDisabled(pageValue, WordBaseValues.MINPAGE)}
        handleClick={() => {
          setValue('page', WordBaseValues.MINPAGE);
        }}
      >
        <i className="fa-solid fa-backward-fast" />
      </PagePickerButton>

      <PagePickerButton
        $groupColor={groupValue}
        isDisabled={checkDisabled(pageValue, borderValues.current.prev)}
        handleClick={() => {
          setValue('page', borderValues.current.prev);
        }}
      >
        <i className="fa-solid fa-backward" />
      </PagePickerButton>

      <PagePickerButton
        $groupColor={groupValue}
        isDisabled
        handleClick={() => {}}
      >
        {pageValue}
      </PagePickerButton>

      <PagePickerButton
        $groupColor={groupValue}
        isDisabled={checkDisabled(pageValue, borderValues.current.next)}
        handleClick={() => {
          setValue('page', borderValues.current.next);
        }}
      >
        <i className="fa-solid fa-forward" />
      </PagePickerButton>

      <PagePickerButton
        $groupColor={groupValue}
        isDisabled={checkDisabled(pageValue, WordBaseValues.MAXPAGE)}
        handleClick={() => {
          setValue('page', WordBaseValues.MAXPAGE);
        }}
      >
        <i className="fa-solid fa-forward-fast" />
      </PagePickerButton>
    </StyledPagePicker>
  );
}

export default PagePicker;
