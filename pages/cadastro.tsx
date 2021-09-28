/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import Box from '../src/components/commons/Box';
import Button from '../src/components/commons/Button';
import Modal from '../src/components/commons/Modal';
import FormCadClient from '../src/components/Forms/Registration/formCadClient';
import CadDichForm from '../src/components/Forms/Registration/cadDishForm';
import Header from '../src/components/Header';
import { breakpointsMedia } from '../src/theme/Utils/breakpoinstMedia';
import { WebContext } from '../src/wrappers/context';
import DishList from '../src/components/Tables/dishLint';
import ClientList from '../src/components/Tables/clientList';

const Section = styled.section`
  display: block;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 15vh;
  width: 60vw;
  height: 60vh;
  padding: 10px;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 2px #EEE;
  overflow: hidden;
  border: 1px solid #FFF;


  ${breakpointsMedia({
    xs: css`
        width: 95vw;
        font-size: 12px
    `,
    sm: css`
      display: flex;
        width: 80vw;
    `,
    lg: css`
        width: 60vw;
        font-size: 15px
    `,
    xl: css`
      padding: 12px;
        width: 60vw;
        height: 40vh; 
    `,
  })}
`;

const WrapperDiv = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;

  label {
    border-bottom: 1px dotted black;
    display: block;
    width: 100%;
    margin-top: 15%;
    text-align: center;
    font-size: 18px;
    font-family: Courier;
    font-weight: bold;
  }


  ${breakpointsMedia({
    md: css`
      width: 50%;

      label {
        margin-top: 0%;
      }
    `,
    lg: css`

    label {
      margin-top: 15%;
      font-size: 22px;
    }
    
    `,
  })}

`;

const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;

  button {
    width: 70px;
  }

  ${breakpointsMedia({
    sm: css`
    
    `,
    md: css`
      button {
        width: 140px;
      }
  
    `,
  })}
`;

export default function Cadastro() {
  type TypeHoocks = {
    isModalOpen: boolean,
    setIsModalOpen: boolean,
    isFormOpen: boolean,
    setIsFormOpen: boolean,
  };

  const {
    isModalOpen, setIsModalOpen, isFormOpen, setIsFormOpen,
  } = useContext(WebContext);
  const [isDishList, setIsDishList] = useState(false);
  const [isVisibleListCadClient, setIsVisibleListCadClient] = useState(false);
  return (
    <>
      <Header />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
        >
          {(propsDoModal: void) => (
            <CadDichForm
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              propsDoModal={propsDoModal}
              onClose={setIsModalOpen}
            />
          )}
        </Modal>
      )}

      {isFormOpen && (
        <Modal
          isOpen={isFormOpen}
          onClose={setIsFormOpen}
        >
          {(propsDoModal: void) => (
            <FormCadClient
              propsDoModal={propsDoModal}
              onClose={setIsFormOpen}
            />
          )}
        </Modal>
      )}

      {isDishList && (
      <Modal
        isOpen={isDishList}
        onClose={setIsDishList}
      >
        {(propsDoModal: void) => (
          <DishList
            propsDoModal={propsDoModal}
          />
        )}
      </Modal>
      )}

      {isVisibleListCadClient && (
      <Modal
        isOpen={isVisibleListCadClient}
        onClose={setIsVisibleListCadClient}
      >
        {(propsDoModal: any) => (
          <ClientList
            propsDoModal={propsDoModal}
          />
        )}
      </Modal>
      )}

      <Box>
        <Section>
          <WrapperDiv>
            <label>Pratos</label>
            <WrapperButton>
              <Button
                background="#FB9400"
                onClick={() => setIsModalOpen(true)}
                disabled={false}
              >
                Cadastrar
              </Button>
              <Button
                background="#FB9400"
                onClick={() => setIsDishList(true)}
                disabled={false}
              >
                Cadastros
              </Button>
            </WrapperButton>
          </WrapperDiv>
          <WrapperDiv>
            <label>Clientes</label>
            <WrapperButton>
              <Button
                background="#FB9400"
                onClick={() => setIsFormOpen(true)}
                disabled={false}
              >
                Cadastrar
              </Button>
              <Button
                background="#FB9400"
                onClick={() => setIsVisibleListCadClient(true)}
                disabled={false}
              >
                Cadastros
              </Button>
            </WrapperButton>
          </WrapperDiv>
        </Section>
      </Box>
    </>
  );
}
