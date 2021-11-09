import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../theme/Utils/breakpointMedia';
import { WebContext } from '../../../wrappers/context';
import Button from '../Button';

const WrapperSection = styled.section`
  border-bottom: 1px dotted black;

  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;

  label {
    font-size: 14px;
    font-weight: bold;
    font-family: cursive;
  }
 
  ${breakpointsMedia({
  ms: css`
      label {
        font-size: 16px;
      }
    `,
  lg: css`
      label {
        font-size: 18px;
      }
    `,
})}

`;

export default function Section({ totalPlace }) {
  const { setIsModalOpen, plates } = useContext(WebContext);
  const isTrue = plates.valueOf().length !== 0;
  return (
    <>
      <WrapperSection>
        <label>
          Total R$
          {' '}
          {totalPlace}
        </label>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={!isTrue}
        >
          Fechar pedido
        </Button>
      </WrapperSection>
    </>
  );
}
