import { createGlobalStyle } from 'styled-components';

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

  a,
  button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
   
    display: flex;
    padding: 0.5rem;
    border: none;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
  }

  i {
    font-size: 2rem;
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
    min-height: 100vh;
    max-width: 100vw;
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-template-rows: 4rem 1fr 3rem;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

export default GlobalStyle;
