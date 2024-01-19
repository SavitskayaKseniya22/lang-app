import styled, { css } from 'styled-components';

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

export const StyledMain = styled('main')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  flex-grow: 2;
  min-width: 320px;
  align-items: center;
  position: relative;
  justify-content: space-between;

  .main__title_main {
    align-self: flex-start;
  }
`;

export const StyledGameContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
`;
