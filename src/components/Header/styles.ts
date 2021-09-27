import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../theme/Utils/breakpoinstMedia';

const StyleHeader = styled.header`
  background: #F8F8F8;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  top: 10px;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-family: sans-serif;

  box-shadow: 0px 3px 10px rgba(13, 1, 1, 0.17);
  border-radius: 50px;

  ${breakpointsMedia({
    xs: css`
    `,
    sm: css`
      font-size: 18px;
    `,

    lg: css`
      top: 30px;
      width: 997px;
      height: 62px;
      font-size: 24px;
    `,
  })}

`;

const OptionNav = styled.nav`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  color: #000000;

  li {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #000000;
    &:hover {
      color: #555555;
      text-decoration: underline;
    } 
  }
`;

export default { OptionNav, StyleHeader };
