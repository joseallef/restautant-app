import React, { FormEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import Lottie from 'lottie-react-web';
import { breakpointsMedia } from '../../../theme/Utils/breakpointMedia';
import Button from '../../commons/Button';
import TextField from '../TextField';
import {
  database, ref, set,
} from '../../../services/firebase';

import cadSuccess from '../../../../public/icon/cadSuccess.json';

export const WrapperForm = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: auto;
top: 20px;
width: 60vw;
height: 80vh; 
padding: 20px;
border-radius: 5px;
background: #FFFFFF;
overflow: hidden;

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

const WrapperButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;

`;
const Lot = styled.div`
  width: 100%;
  justify-content: space-evenly;
  font-size: 20px;

  div {
    width: 100px! important;
  }
`;

export default function FormCadClient({ propsDoModal, onClose }) {
  const [data, setData] = useState({
    celphone: '',
    street: '',
    number: '',
  });

  const formStatus = {
    DEFAULT: 'DEFAULT',
    LOADING: 'LOADING',
    DONE: 'DONE',
    ERROR: 'ERROR',
  };
  const [status, setStatus] = useState(formStatus.DEFAULT);

  function clearData() {
    setData({
      ...data, celphone: '', street: '', number: '',
    });
  }

  function handleChange(event: FormEvent) {
    const fieldName = event.target.getAttribute('name');
    setData({
      ...data, [fieldName]: event.target.value,
    });
  }

  function writeUserData(event: FormEvent) {
    event.preventDefault();
    setStatus(formStatus.LOADING);
    set(ref(database, `clients/${new Date().getTime()}`), {
      cellfone: data.celphone,
      street: data.street,
      number: data.number,
    })
      .then(() => {
        setStatus(formStatus.DONE);
        clearData();
        setTimeout(() => {
          onClose();
        }, 3000);
      }).catch(() => {
        setStatus(formStatus.ERROR);
      });
  }

  const isValidForm = data.celphone.length < 8
    || data.street.length < 2 || data.number.length < 0 || data.number === '';

  return (
    <WrapperForm
      {...propsDoModal}
    >
      <form onSubmit={writeUserData}>
        <TextField
          tag="text"
          name="celphone"
          value={data.celphone}
          placeholder="Tel (11) 99999-9999"
          onChange={handleChange}
        />
        <TextField
          tag="text"
          name="street"
          value={data.street}
          placeholder="Rua"
          onChange={handleChange}
        />
        <TextField
          tag="text"
          name="number"
          value={data.number}
          placeholder="Número"
          onChange={handleChange}
        />
        <WrapperButton>
          <Button
            background="#e3473c"
            onClick={() => onClose()}
          >
            Cancelar
          </Button>
          <Button
            background="#aff8ab"
            type="submit"
            disabled={isValidForm}
          >
            Cadastrar
          </Button>
        </WrapperButton>
        {status === formStatus.DONE && (
          <Lot>
            <Lottie
              width="50px"
              options={{
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                animationData: cadSuccess,
                loop: true,
              }}
            />
            <span>Cadastrado com sucesso!</span>
          </Lot>
        )}
      </form>
    </WrapperForm>
  );
}
