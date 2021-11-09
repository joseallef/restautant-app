import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../theme/Utils/breakpointMedia';

const H1 = styled.h1`
  font-family: sans-serif;
  color: #675C5C;
  argin-bottom: 0;
  font-size: 18px;


  ${breakpointsMedia({
  md: css`
      font-size: 20px;
    `,
  lg: css`
    font-size: 26px;
    margin-top: 40px;
    `,
})}
`;

const TableContainer = styled.table`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 100%;
  height: min-content;
  align-items: center;
  justify-content: center;

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
  padding: 0px;


  ${breakpointsMedia({
  sm: css`
      font-size: 18px;
    `,
  md: css`
    
    `,

  lg: css`
      font-size: 20px;
    `,

})}
  
  tr {
    background: #FDA223;
    padding: 5px
  }
`;

const TR = styled.tr`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background: #FEE3BA;
  border: 1px solid #FFFFFF;
  
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
  overflow-y: auto;

  ${breakpointsMedia({
  sm: css`
      font-size: 16px;
    `,

  lg: css`
      font-size: 18px;
    `,

})}

  tr {
    &:hover {
      background: #FFECD0;      
    }
  }
`;

const TD = styled.td`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 8px;
  align-items: center;

  img {
    width: 80px;
  }
`;

const WrapperButton = styled.div`
  button {
    padding: 2px;
    margin: 3px;
    background: #dcdff1;
    width: 40px;
    font-size: 18px;
    border: none;
    cursor: pointer;

    &:hover {
      background: #d8d6db;
    }  
}
`;

const WrapperDialog = styled.div`
  display: inline-grid;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  width: 20vw;
  margin-left: 5%;
  margin-right: 5%;
  padding: 12px;
  border-radius: 5px;
  background: #FFFFFF;
  overflow: hidden;

  margin-top: 20vh;

  span {
    font-size: 20px;
  }

  div {
    width: 100%! important;
    height: 100%! important;
  }

  ${breakpointsMedia({
  xs: css`
      width: 20vw;
        font-size: 12px
      `,
  sm: css`
      width: 20vw;
    `,
  md: css`
      width: 20vw;
    `,
  lg: css`
      width: 20vw;
      font-size: 15px
    `,
  xl: css`
      width: 20vw;
    `,
})}

`;

export {
  H1, TableContainer, THead, TR, TH, TBody, TD, WrapperButton, WrapperDialog,
};
