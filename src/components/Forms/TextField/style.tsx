import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../theme/Utils/breakpointMedia';

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 17px;
  border: none;
  border-bottom: 1px solid #555;
  font-size: 14px;
  text-align: center;

  &:focus {
      outline: none;
  }

  ${breakpointsMedia({
  md: css`
      font-size: 17px;
    `,
  lg: css`
      width: 100%;
      font-size: 20px;
    `,
})}

`;

export default Input;
