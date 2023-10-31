import { css } from 'styled-components';
import { checkColor } from '../utils';

export const gradientBackground = css`
  background: linear-gradient(
    -30deg,
    rgb(38, 70, 83) 20%,
    rgb(42, 157, 143) 40%,
    rgb(244, 162, 97) 60%,
    rgb(231, 111, 81) 80%,
    rgb(233, 196, 106) 100%
  );
`;

export const gradientBorderContainer = css`
  padding: 0.5rem;
  border-radius: 1rem;
  ${gradientBackground}
`;

export const StyledPageButton = css<{ $groupColor: number }>`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  background-color: ${(props) => checkColor(props.$groupColor)};
`;
