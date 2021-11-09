import React, { FocusEvent, useContext } from 'react';
import { WebContext } from '../../wrappers/context';
import Button from '../commons/Button';
import { GlobalStyle, WrapperPrint, PrintableBodyWrapper,
  THead, TR, TH, TBody, TD, WrapperButtom } from './style';

export default function PrintOrder({ propsDoModal, onClose }) {
  const { plates, setPlates, totalPrice, selectedAndres, setSelectedAndres, toggleDialog } = useContext(WebContext);
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
    setSelectedAndres({})
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
                Sub total = R$
                {' '}
                {totalPrice}
              </TD>
            </tr>
            
          </TBody>
        </table>
        <div style={{
          display: "flex",
          width: "400px",
          position: "fixed",
          top: 120,
          justifyContent:"center"
        }}>
          {Object.keys(selectedAndres).length > 0 && (
          <p>Frete R$ 3</p>
          )}
        </div>
        <PrintableBodyWrapper style={{
          display: "flex",
          width: "400px",
          position: "fixed",
          top: 170,
          justifyContent:"center"          
        }}>
          {Object.keys(selectedAndres).length > 0 && (
            <>
              <h4>Endereço para entrega:</h4>
                <div style={{
                  display: "flex",
                  width: "400px",
                  position: "fixed",
                  top: 190,
                  justifyContent:"center"
                }}>
                  <p>{selectedAndres.street}</p>
                  <p>{selectedAndres.number}</p>
                </div>
              </>
            )}       
      
        <div style={{
          display: "flex",
          width: "400px",
          position: "fixed",
          top: 170,
          justifyContent:"center"
        }}>         
          Total = R$
          {' '}
          {Object.keys(selectedAndres).length > 0 && (
            <>
              {totalPrice + 3}
            </>
          )}
            {Object.keys(selectedAndres).length <= 0 && (
            <>
              {totalPrice}
            </>
          )}
        </div>
        </PrintableBodyWrapper>
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
