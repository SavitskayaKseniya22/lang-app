import { createGlobalStyle } from 'styled-components';
import { ScreenSize } from '../interfaces';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  p,
  ul {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin: 0;
  }

  
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  a {
     text-decoration: none;
  }

 
  h1 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
    margin: 0;
    color: black;
  }

  h4{ 
    margin: 0;

  }

  #root {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction:column;

    @media ${ScreenSize.TABLET} {
    flex-direction: row;
  }
  
  }
`;

export default GlobalStyle;
