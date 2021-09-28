import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../theme/Utils/breakpoinstMedia';

export const WrapperForm = styled.div`
  display: block;
  justify-content: center;
  margin: auto;
  top: 20px;
  width: 60vw;
  height: 80vh; 
  max-height: 80vh; 
  padding: 12px;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 2px #999;
  overflow-y: auto;

  form {
    width: 100%
  }

  tr {
    &:hover {
      box-shadow: 0 0 0 2px 2px #999;
      cursor: pointer;
  
    }
  }

  ${breakpointsMedia({
    xs: css`
        width: 95vw;
        font-size: 12px
    `,
    sm: css`
        width: 80vw;
    `,
    lg: css`
        width: 60vw;
        font-size: 15px
    `,
    xl: css`
        width: 60vw;
    `,
  })}

`;
