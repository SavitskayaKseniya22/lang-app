import { css } from 'styled-components';

export const gradientBackground = css`
  background: linear-gradient(
    -30deg,
    rgba(38, 70, 83) 0%,
    rgba(38, 70, 83) 20%,
    rgba(42, 157, 143) 20%,
    rgba(42, 157, 143) 40%,
    rgba(244, 162, 97) 40%,
    rgba(244, 162, 97) 60%,
    rgba(231, 111, 81) 60%,
    rgba(231, 111, 81) 80%,
    rgba(233, 196, 106) 80%,
    rgba(233, 196, 106) 100%
  );
`;

export const gradientBorderContainer = css`
  padding: 0.5rem;
  border-radius: 1rem;
  ${gradientBackground}
`;
