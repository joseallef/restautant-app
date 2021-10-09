import styled, { createGlobalStyle, css } from "styled-components";
import { breakpointsMedia } from "../../theme/Utils/breakpoinstMedia";


const GlobalStyle = createGlobalStyle`
@page {
  size: landscape;
  margin: 0cm;
}
`;

const WrapperPrint = styled.div`
display: inline-grid;
justify-content: space-evenly;
align-items: center;
margin: auto;
width: 95vw;
height: 60vh; 
padding: 5px;
border-radius: 5px;
background: #F0FAAF;
box-shadow: 0 0 10px 2px #999;
overflow-y: auto;
overflow-x: hidden;
max-height: 800px;
font-family: Courier;
font-weight: bold;
text-align: left;



${breakpointsMedia({
    sm: css`
    width: 300px;
  `,
    lg: css`
    width: 400px;
    font-size: 18px
  `,
  })}

`;

const PrintableBodyWrapper = styled.div`
  @media print {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }
`;

const TableContainer = styled.table`
  @media print {
    border: 2px solid black;
  }
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: min-content;
  align-items: center;
  justify-content: center;
  background: #F0FAAF;

${breakpointsMedia({
    lg: css`
    max-width: 960px;
  `,
  })}
`;

const THead = styled.thead`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family: Courier, sans-serif;

`;

const TR = styled.tr`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  
`;

const TH = styled.th`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`;
const TBody = styled.tbody`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;
  max-height: 80vh;

`;

const TD = styled.td`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px;
  align-items: center;
`;

const WrapperButtom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export { GlobalStyle, WrapperPrint, PrintableBodyWrapper, TableContainer,
  THead, TR, TH, TBody, TD, WrapperButtom };
