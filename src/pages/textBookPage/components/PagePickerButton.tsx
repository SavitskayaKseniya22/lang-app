import React from 'react';
import styled from 'styled-components';
import { ChildrenProps, ScreenSize } from '../../../interfaces';
import { checkColor } from '../../../utils';

const StyledPagePickerButton = styled('button')<{ $groupColor: number }>`
  width: 2rem;
  height: 2rem;
  color: white;
  background-color: ${(props) => checkColor(props.$groupColor)};

  &:disabled {
    background-color: rgba(42, 157, 144, 0.2);
    pointer-events: none;
  }

  @media ${ScreenSize.TABLET} {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

function PagePickerButton({
  $groupColor,
  isDisabled,
  children,
  handleClick,
}: {
  $groupColor: number;
  isDisabled: boolean;
  children: ChildrenProps;
  handleClick: () => void;
}) {
  return (
    <StyledPagePickerButton
      $groupColor={$groupColor}
      disabled={isDisabled}
      type="button"
      onClick={handleClick}
    >
      {children}
    </StyledPagePickerButton>
  );
}

export default PagePickerButton;
