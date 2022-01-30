import React, { useContext, useEffect } from 'react';
import Header from '../../src/components/Header';
import Box from '../../src/components/commons/Box';
import { H1 } from '../../src/components/Tables/style';
import Table from '../../src/components/Tables/wishList';
import Modal from '../../src/components/commons/Modal';
import Dialog from '../../src/components/commons/WrapperDialog';

import { WebContext } from '../../src/wrappers/context';
import FormSearchRegistration from '../../src/components/Forms';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks';
import { parseCookies } from 'nookies';
import { auth } from '../../src/services/firebase';
import { AuthContext } from '../../src/contexts';
import { authLogin } from '../../src/auth';

export default function Pedidos({ token }) {
  async function usuario() {
    const { dataUser } = await useAuth();
    return dataUser;
  }
  const { dataUser } = useAuth();
  const router = useRouter();
  const cookies = parseCookies();

  
  
  useEffect(() => {
    console.log(usuario);
    if (token !== auth.currentUser?.accessToken) {
      router.push('/');
    }
  }, []);
  
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
          <FormSearchRegistration
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

export async function getServerSideProps(ctx) {

  const auth = authLogin(ctx);
  const token = await auth.getToken();
  
  return {
    props: {
      token,
    },
  }
}
