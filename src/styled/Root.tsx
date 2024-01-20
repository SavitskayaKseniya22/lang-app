import { css } from 'styled-components';
import { ScreenSize } from '../interfaces';

const root = css`
  #root {
    min-height: 100svh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    @media ${ScreenSize.TABLET} {
      flex-direction: row;
    }
  }
`;

export default root;
