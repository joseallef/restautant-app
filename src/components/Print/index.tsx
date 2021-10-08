import React, { FocusEvent, useContext } from 'react';
import styled, { css, createGlobalStyle  } from 'styled-components';
import { breakpointsMedia } from '../../theme/Utils/breakpoinstMedia';
import { WebContext } from '../../wrappers/context';
import Button from '../commons/Button';

const GlobalStyle = createGlobalStyle`
@page {
  size: landscape;
  margin: 0cm;
}
`;

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

const PrintableBodyWrapper = styled.div`
  @media print {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }
`;

const TableContainer = styled.table`
  @media print {
    border: 2px solid black;
  }
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

const WrapperButtom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function PrintOrder({ propsDoModal, onClose }) {
  const { plates, setPlates, totalPrice, selectedAndress, setSelectedAndress, toggleDialog } = useContext(WebContext);
  const keys = Object.keys(plates);
  function MountPdf(values: FocusEvent) {
    values.preventDefault();
    const doc = document.querySelector('#imprimir')?.innerHTML;

    // Alterna o body
    // eslint-disable-next-line no-multi-assign
    const oldPage = document.body.innerHTML;
    // const conteudo = document.body.innerHTML = `<html><head><title>Comprovante</title></head><body>${doc}</body></html>`;

    const janela = window.open('', '', 'width=400px, height=600px');
    janela?.document.write(`<html><head><title>Comprovante</title>
    </head>
      <body style='margin: auto; display:flex; padding: 0px; font-family: monospace; justify-content: space-evenly; align-items: flex-start;'">
      ${doc}
    </body></html>`);
    janela?.print();
    // document.body.innerHTML = oldPage;
    janela?.document.close();

    setPlates([]);
    setSelectedAndress({})
    onClose();
  }
  return (
    <WrapperPrint
      {...propsDoModal}

    >
      <form id="imprimir">
        <GlobalStyle />
    
        <table>
          <THead>
            <tr style={{
              display: "flex",
              justifyContent: "space-around"

            }}
            >
              <TH>Prato</TH>
              <TH>Unidade</TH>
              <TH>RS Preço</TH>
            </tr>
          </THead>
          <TBody>
            {keys.map((key) => (
              <tr style={{
                display: "flex",
                justifyContent: "space-around"
  
              }}
               key={Math.random().toString(36).substr(2, 9)}>
                <TD>
                  {plates[`${key}`].name}
                </TD>
                <TD>
                  {plates[`${key}`].amount}
                </TD>
                <TD>
                  {plates[`${key}`].price}
                </TD>
              </tr>
            ))}
            <tr
            style={{
              display: "flex",
              width: "340px",
              position: "relative",
              top: 20,
              justifyContent:"center"
    
              
            }}>
              <TD>
                Total = R$
                {' '}
                {totalPrice}
              </TD>
            </tr>
            
          </TBody>
          
        </table>
        <PrintableBodyWrapper style={{
          display: "flex",
          width: "400px",
          position: "fixed",
          top: 170,
          justifyContent:"center"          
        }}>
          {/* <TBody> */}
          {Object.keys(selectedAndress).length > 0 && (
            // <>
            //   <TR>
            //     <TD>
            //       Endereço para entrega:
            //     </TD>
            //   </TR>
            //   <TR>
            //     <TD>
            //       {' '}
            //       {selectedAndress.street}
            //       {' '}
            //       {selectedAndress.number}
            //     </TD>
            //   </TR>
            // </>
            <>
              <h4>Endereço para entrega:</h4>
            </>
            )}
          {/* </TBody> */}
        </PrintableBodyWrapper>
        <div style={{
          display: "flex",
          width: "400px",
          position: "fixed",
          top: 190,
          justifyContent:"center"
        }}>
          {' '}
          <p>{selectedAndress.street}</p>
          {' '}
          <p>{selectedAndress.number}</p>
        </div>
      </form>
      <WrapperButtom>  
        <Button onClick={() => {
          onClose();
          toggleDialog();
          }
        }>
            Cancelar
        </Button>
        <Button onClick={MountPdf} type="submit">Imprimir</Button>
      </WrapperButtom>
    </WrapperPrint>

  );
}
