import styled from 'styled-components';
import { ScreenSize } from '../interfaces';

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
    color: rgba(38, 70, 83);
  }
`;

export const StyledGameContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  gap: 1rem;

  @media ${ScreenSize.TABLET} {
    gap: 4rem;
    justify-content: center;
  }
`;
