import React, { useContext } from 'react';
import Header from '../src/components/Header';
import Box from '../src/components/commons/Box';
import { H1 } from '../src/components/Tables/style';
import Table from '../src/components/Tables/wishList';
import Modal from '../src/components/commons/Modal';
import Dialog from '../src/components/commons/WrapperDialog';

import { WebContext } from '../src/wrappers/context';
import FormShearchRegistration from '../src/components/Forms';

export default function Pedidos() {
  const {
    isModalOpen, setIsModalOpen, isFormOpen, setIsFormOpen,
  } = useContext(WebContext);
  return (
    <>
      <Header />
      <Modal
        isOpen={isModalOpen}
      >
        {(propsDoModal) => (
          <Dialog
            propsDoModal={propsDoModal}
            setIsFormOpen={setIsFormOpen}
            onClose={setIsModalOpen}
          />
        )}
      </Modal>
      <Modal
        isOpen={isFormOpen}
      >
        {(propsDoModal) => (
          <FormShearchRegistration
            onClose={setIsFormOpen}
            propsDoModal={propsDoModal}
          />
        )}
      </Modal>
      <Box>
        <H1>Pedidos</H1>
        <Table />
      </Box>
    </>
  );
}
