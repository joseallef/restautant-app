import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../theme/Utils/breakpointMedia';

export const Main = styled.main`
display: flex;
flex-wrap: wrap;
margin-left: auto;
margin-right: auto;
margin-top: 50px;
width: 100%;
align-items: center;
justify-content: center;

${breakpointsMedia({
  lg: css`
    max-width: 960px;
  `,
})}
`;
