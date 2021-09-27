import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #F9F9FB;
    overflow-x: hidden;
  }

  /* Full height layout */
  html, body {
    display: flex;
    min-height: 100vh;
    width: 100%;
    
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

`;
