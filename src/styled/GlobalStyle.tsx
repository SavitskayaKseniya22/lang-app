import { createGlobalStyle } from 'styled-components';
import titles from './Titles';
import root from './Root';

const GlobalStyle = createGlobalStyle`
  ${root};
  ${titles};
  
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  p,
  ul,
  body {
    margin: 0;
  }


  ul {
    list-style: none;
    padding: 0;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    font-family: inherit;
  }

`;

export default GlobalStyle;
