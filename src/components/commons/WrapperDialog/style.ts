import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../theme/Utils/breakpointMedia';

const WrapperDialog = styled.div`
  display: inline-grid;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  width: 40vw;
  height: 40vh; 
  padding: 12px;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 2px #999;
  overflow: hidden;

  ${breakpointsMedia({
  xs: css`
        width: 95vw;
        font-size: 12px
      `,
  sm: css`
      width: 70vw;
    `,
  md: css`
      width: 50vw;
    `,
  lg: css`
      width: 40vw;
      font-size: 15px
    `,
  xl: css`
      width: 30vw;
    `,
})}

`;

const Label = styled.label`
  display: block;
  width: 100%;
  font-size: 20px;
  font-family: Courier;
  font-weight: bold;
  text-align: center;

  ${breakpointsMedia({
  sm: css`
      font-size: 25px;
    `,
  lg: css`
      font-size: 30px;
    `,
})}

`;

const WrapperButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  color: #FFF;
  background: #c0c0c3;
  border: none;
  margin: 20px;
  display: flex;
  justify-content: center;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background: #c4cacb;
  }
`;

export {
  WrapperDialog, Label, WrapperButton, Button,
};
