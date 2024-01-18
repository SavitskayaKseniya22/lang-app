import React, { Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import { PageType, ScreenSize, WordBaseValues } from '../../../interfaces';

const StyledPagePicker = styled('div')`
  display: flex;
  gap: 1rem;

  input {
    display: none;
  }
`;

const StyledPagePickerButton = styled('button')`
  width: 2rem;
  height: 2rem;
  color: white;
  background-color: rgb(244, 162, 97);

  &:disabled {
    background-color: rgb(42, 157, 144);
  }

  @media ${ScreenSize.TABLET} {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

function PagePicker({
  values,
}: {
  values: PageType & { setPage: Dispatch<SetStateAction<number>> };
}) {
  const borderValues = useRef({ prev: 0, next: 1 });

  const handleClick = (value: number) => {
    values.setPage(value);

    const prev =
      value > WordBaseValues.MINPAGE ? value - 1 : WordBaseValues.MINPAGE;

    const next =
      value < WordBaseValues.MAXPAGE ? value + 1 : WordBaseValues.MAXPAGE;

    borderValues.current = { prev, next };
  };

  return (
    <StyledPagePicker>
      <StyledPagePickerButton
        disabled={values.page === WordBaseValues.MINPAGE}
        onClick={() => {
          handleClick(WordBaseValues.MINPAGE);
        }}
      >
        <i className="fa-solid fa-backward-fast" />
      </StyledPagePickerButton>

      <StyledPagePickerButton
        disabled={values.page === borderValues.current.prev}
        onClick={() => {
          handleClick(borderValues.current.prev);
        }}
      >
        <i className="fa-solid fa-backward" />
      </StyledPagePickerButton>

      <StyledPagePickerButton disabled>{values.page}</StyledPagePickerButton>

      <StyledPagePickerButton
        disabled={values.page === borderValues.current.next}
        onClick={() => {
          handleClick(borderValues.current.next);
        }}
      >
        <i className="fa-solid fa-forward" />
      </StyledPagePickerButton>

      <StyledPagePickerButton
        disabled={values.page === WordBaseValues.MAXPAGE}
        onClick={() => {
          handleClick(WordBaseValues.MAXPAGE);
        }}
      >
        <i className="fa-solid fa-forward-fast" />
      </StyledPagePickerButton>
    </StyledPagePicker>
  );
}

export default PagePicker;
