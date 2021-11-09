import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Button from '../src/components/commons/Button';
import Modal from '../src/components/commons/Modal';
import TextField from '../src/components/Forms/TextField';
import { WrapperDialog } from '../src/components/Tables/style';
import { database, child, get, ref } from '../src/services/firebase';
import { useAuth } from '../src/hooks';
import { authLogin } from './api/auth/authAccess';
import { parseCookies } from 'nookies';

export default function Login({ values }) {
  const router = useRouter();

  const { authWithFirebase } = useAuth();

  const [data, setData] = useState({
    user: '',
    password: '',
  });
  function handleChange(event: FormEvent) {
    const fieldName = event.target.getAttribute('name');
    setData({
      ...data, [fieldName]: event.target.value,
    });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
  
    const response = await authWithFirebase(data.user, data.password);

    if (response) {
      router.push('/cardapio');
    } else {
      (<div>Usuário ou senha incorreta</div>)
      alert('Usuário ou senha incorreta');
    }
 
  }

  return (
    <>
      <Modal
        isOpen={true}
      >
        {() => (
          <WrapperDialog
            style={{
              margin: 'auto',
              width: '500px',
            }}
          >
            <form
              style={{
                padding: '50px',
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                background: '#F8F8F8'

              }}
              onSubmit={onSubmit}
            >
              <TextField
                tag="text"
                name="user"
                placeholder="Usúario"
                value={data.user}
                onChange={handleChange}
              />
              <TextField
                tag="text"
                name="password"
                placeholder="Senha"
                value={data.password}
                onChange={handleChange}
              />
              <Button
              // disabled
              >
                Login
              </Button>
            </form>
          </WrapperDialog>
        )}
      </Modal>
    </>
  );
}
export async function getServerSideProps(ctx) {
  // const { dataUser } = useAuth();
  // const session = await parseCookies(ctx);
  // const dataUser = true;

  // const auth = authLogin(ctx);

  // const res = await auth.hasActiveSession();

  // console.log('res', res);

  const dbRef = ref(database);
  const values = await get(child(dbRef, 'users/'))
    .then((snapshot) => snapshot.val())
    .catch((e) => {
      throw new Error('Oooppss (:');

    });
  return {
    props: {
      values,
    },
  }
}