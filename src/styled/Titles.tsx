import { css } from 'styled-components';
import { ScreenSize } from '../interfaces';

const titles = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h5 {
    font-size: 1rem;
    font-weight: 100;
  }

  @media ${ScreenSize.LAPTOPL} {
    h1 {
      font-size: 4rem;
    }

    h2 {
      font-size: 3rem;
    }

    h3 {
      font-size: 2.5rem;
    }

    h4 {
      font-size: 2rem;
    }

    h5 {
      font-size: 1.5rem;
    }
  }
`;

export default titles;
