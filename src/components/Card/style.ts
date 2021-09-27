import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../theme/Utils/breakpoinstMedia';

const StyleCard = styled.div`
  margin: 20px;
  text-align: center;
  font-family: Courier;
  font-style: initial;
  font-weight: bold;
  width: 100%;
  border-radius: 5px;
  padding: 1px;
  background: #FFFFFF;
  transition: margin-bottom .5s;

  
  &:hover {
    margin-bottom: 5px;
  }

  ${breakpointsMedia({
    sm: css`
      width: 200px;
    `,
    lg: css`
      width: 200px;
    `,
  })}

`;

const Img = styled.img`
  width: 100%;
  height: 180px;
`;

const AreaConfirm = styled.div`
  display: block;

  font-size: 20px;

  button {
    background: #FB9400;
    width: 120px;
    padding: 8px;
    cursor: pointer;
    margin: 5px;
    border: none;
    border-radius: 3px;
    font-family: system-ui;
    color: #FFF;

    &:hover {
      background: #FFAC3B;
      
    }
  }

  select {
    margin: 5px;
    padding: 7px;
    border: none;
  }
`;

export { StyleCard, Img, AreaConfirm };
