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

  input {
    padding: 0;
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
    font-size:inherit;
    line-height: 1;
  }

  a {
    text-decoration: none;
    font-family: inherit;
    color:inherit;
    font-size:inherit;
    line-height: 1;
  }

`;

export default GlobalStyle;
