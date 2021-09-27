import React, { useContext } from 'react';
import { WebContext } from '../../wrappers/context';
import Section from '../commons/Section';
import {
  TableContainer, THead, TR, TH, TBody, TD, WrapperButton,
} from './style';

export default function Table() {
  const {
    plates, addNewValue, subtractValue, newObj, totalPrice, setTotalPrice,
  } = useContext(WebContext);
  const keys = Object.keys(plates);

  async function calculatePrice() {
    const total = await keys.map((key) => Number(plates[`${key}`].amount) * Number(plates[`${key}`].price));
    let soma = 0;

    for (let i = 0; i < total.length; i++) {
      soma += total[i];
    }
    setTotalPrice(soma);
    return soma;
  }

  return (
    <>
      <TableContainer>
        <THead>
          <TR>
            <TH>Pratos</TH>
            <TH>Quantidade</TH>
            <TH>Valor</TH>
            <TH>Alterar</TH>
          </TR>
        </THead>
        <TBody>
          {keys.map((key) => (
            <TR key={key}>
              <TD>
                {plates[`${key}`].name}
              </TD>
              <TD>
                {plates[`${key}`].amount}
              </TD>
              <TD>
                {plates[`${key}`].price}
              </TD>
              <TD>
                <WrapperButton>
                  <button onClick={() => subtractValue(key)}>-</button>
                  <button onClick={() => addNewValue(key)}>+</button>
                  <button onClick={() => newObj(key)}>x</button>
                </WrapperButton>
              </TD>
            </TR>
          ))}
        </TBody>
      </TableContainer>
      <Section
        totalPlace={totalPrice}
        funct={calculatePrice()}
      />
    </>
  );
}
