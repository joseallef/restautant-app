/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../theme/Utils/breakpoinstMedia';

type PropsTypeBg = {
  background: string | any,
};

const WrapperButton = styled.button`
  padding: 10px;
  color: #FFF;
  border: none;
  margin: 5px;
  display: flex;
  justify-content: center;
  font-size: 12px;

  ${breakpointsMedia({
    md: css`
      font-size: 14px;
      width: 140px;
      margin: 20px;
    `,
    lg: css`
      font-size: 16px;
    `,
  })}

  ${({ background }: PropsTypeBg) => {
    if (background) {
      return css`
        background: ${background};
      `;
    }
  }}

  
  ${({ disabled }) => {
    if (disabled) {
      return css`
        &:hover,
        &:focus {
          cursor: not-allowed;
          background: rgb(204, 212, 213);
          border-color: rgba(44,77,250,0.23);
          box-shadow: 0 0 5px 1px rgba(44,77,250,0.23);
        }
      `;
    }
    return css`
    &:hover,
    &:focus {
        background: #FFAF3F;
        cursor: pointer;
      }
    `;
  }}

  
`;

type Props = {
  background: string | HTMLButtonElement,
  children: ReactNode,
  disabled: boolean,
  // onClick: boolean | void | any,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
};

export default function Button({
  background, children, disabled, ...props
}: Props): JSX.Element {
  const isTrue = !!disabled;
  const isDefault = background || '#FB9400';
  return (
    <>
      <WrapperButton
        background={isDefault}
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        disabled={isTrue}
      >
        {children}
      </WrapperButton>
    </>
  );
}
