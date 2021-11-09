import React, { FormEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import Lottie from 'lottie-react-web';
import { breakpointsMedia } from '../../../theme/Utils/breakpointMedia';
import Button from '../../commons/Button';
import TextField from '../TextField';
import { database, ref, set } from '../../../services/firebase';
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

export default function CadDishForm({ propsDoModal, onClose }) {
  const [data, setData] = useState({
    nameOfDish: '',
    price: '',
    path_img: '',
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
      ...data, nameOfDish: '', price: '', path_img: '',
    });
  }

  function writeDishData(event: FormEvent) {
    event.preventDefault();
    setStatus(formStatus.LOADING);
    set(ref(database, `dishs/${new Date().getTime()}`), {
      dish_name: data.nameOfDish,
      price: data.price,
      path_img: data.path_img,
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

  const isValidForm = data.nameOfDish.length < 3
    || data.price.length < 0 || data.path_img.length < 15;

  function handleChange(event: FormEvent) {
    const fieldName = event.target.getAttribute('name');
    setData({
      ...data, [fieldName]: event.target.value,
    });
  }

  return (
    <WrapperForm
      {...propsDoModal}
    >
      <form>
        <TextField
          tag="text"
          name="nameOfDish"
          value={data.nameOfDish}
          placeholder="Nome do prato"
          onChange={handleChange}
        />
        <TextField
          tag="text"
          name="price"
          value={data.price}
          placeholder="Preço em R$"
          onChange={handleChange}
        />
        <TextField
          tag="text"
          name="path_img"
          value={data.path_img}
          placeholder="Url da imagem"
          onChange={handleChange}
        />
        {status === formStatus.DEFAULT && (
          <WrapperButton>
            <Button
              background="#e3473c"
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <Button
              background="#aff8ab"
              onClick={writeDishData}
              disabled={isValidForm}
            >
              Cadastrar
            </Button>
          </WrapperButton>
        )}
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
