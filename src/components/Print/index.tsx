import React, { FocusEvent, useContext } from 'react';
import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../theme/Utils/breakpoinstMedia';
import { WebContext } from '../../wrappers/context';

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

const TableContainer = styled.table`
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
  overflow-y: auto;

`;

const TD = styled.td`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px;
  align-items: center;
`;

export default function PrintOrder({ propsDoModal }) {
  const { plates, totalPrice, selectedAndress } = useContext(WebContext);
  const keys = Object.keys(plates);
  function MountPdf(values: FocusEvent) {
    values.preventDefault();
    const doc = document.querySelector('#imprimir')?.innerHTML;

    // Alterna o body
    // eslint-disable-next-line no-multi-assign
    // const oldPage = document.body.innerHTML;
    // const conteudo = document.body.innerHTML = `<html><head><title>Comprovante</title></head><body>${doc}</body></html>`;

    const janela = window.open('', '', 'width=450px, height=600px');
    janela?.document.write(`<html><head><title>Comprovante</title>
    </head>
      <body style='margin: auto; display:flex; padding: 10px; font-family: monospace; justify-content: center; align-items: flex-start;'">
      ${doc}
    </body></html>`);
    janela?.print();
    // document.body.innerHTML = oldPage;
    janela?.document.close();
  }
  return (
    <WrapperPrint
      {...propsDoModal}

    >
      <form onSubmit={MountPdf} id="imprimir">
        <TableContainer>
          <THead>
            <TR>
              <TH>Prato</TH>
              <TH>Unidade</TH>
              <TH>RS Preço</TH>
            </TR>
          </THead>
          <TBody>
            {keys.map((key) => (
              <TR key={Math.random().toString(36).substr(2, 9)}>
                <TD>
                  {plates[`${key}`].name}
                </TD>
                <TD>
                  {plates[`${key}`].amount}
                </TD>
                <TD>
                  {plates[`${key}`].price}
                </TD>
              </TR>
            ))}
            <TR>
              <TD>
                Total = R$
                {' '}
                {totalPrice}
              </TD>
            </TR>
            {Object.keys(selectedAndress).length > 0 && (
            <>
              <TR>
                <TD>
                  Endereço para entrega:
                </TD>
              </TR>
              <TR>
                <TD>
                  {' '}
                  {selectedAndress.street}
                  {' '}
                  {selectedAndress.number}
                </TD>
              </TR>
            </>
            )}
          </TBody>
        </TableContainer>
      </form>

      <button onClick={MountPdf} type="submit">Imprimir</button>

    </WrapperPrint>

  );
}
