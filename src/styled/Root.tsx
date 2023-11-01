import { css } from 'styled-components';
import { ScreenSize } from '../interfaces';

const root = css`
  #root {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
  }

  @media ${ScreenSize.TABLET} {
    #root {
      flex-direction: row;
    }
  }
`;

export default root;
