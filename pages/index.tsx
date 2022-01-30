import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Button from '../src/components/commons/Button';
import Modal from '../src/components/commons/Modal';
import TextField from '../src/components/Forms/TextField';
import { WrapperDialog } from '../src/components/Tables/style';
import { database, child, get, ref } from '../src/services/firebase';
import { useAuth } from '../src/hooks';
import { authLogin } from '../src/auth';

export default function Login(props) {
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
      router.push('/app/cardapio');
    } else {
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
                tag="password"
                name="password"
                placeholder="Senha"
                value={data.password}
                onChange={handleChange}
              />
              <Button
              // disabled
              type="submit"
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
export async function getServerSideProps(ctx: any) {
  const auth = authLogin(ctx);
  const t = await auth.getToken();
  const dbRef = ref(database);
  const values = await get(child(dbRef, 'users/'))
    .then((snapshot) => snapshot.val())
    .catch(() => {
      throw new Error('Oooppss (:');
    });
  return {
    props: {
      values,
    },
  }
}