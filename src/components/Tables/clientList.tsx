import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react-web';
import {
  TableContainer, TBody, TD, TH, THead, TR, WrapperDialog,
} from './style';
import {
  database, ref, get, child, remove,
} from '../../services/firebase';
import Button from '../commons/Button';

import loading from '../../../public/icon/loading-spinner.json';
import notData from '../../../public/icon/no-data.json';

export default function ClientList({ propsDoModal }) {
  const [dataClient, setDataClient] = useState({});
  const myKys = Object.keys(dataClient);
  const dbRef = ref(database);

  const formStatus = {
    DEFAULT: 'DEFAULT',
    LOADING: 'LOADING',
    DONE: 'DONE',
    ERROR: 'ERROR',
  };
  const [status, setStatus] = useState(false);
  const [statusLoading, setStatusLoading] = useState(formStatus.DEFAULT);

  useEffect(() => {
    setStatusLoading(formStatus.LOADING);
    get(child(dbRef, 'clients/'))
      .then((snapshot) => snapshot)
      .then((values) => {
        if (values.val() !== null) {
          setDataClient(values.val());
          setStatus(true);
          setStatusLoading(formStatus.DONE);
        } else {
          setDataClient({});
          setStatus(false);
          setStatusLoading(formStatus.DEFAULT);
        }
      })
      .catch(() => {
        setStatus(false);
        setStatusLoading(formStatus.ERROR);
      });
  }, [dbRef, formStatus.DEFAULT, formStatus.DONE, formStatus.ERROR, formStatus.LOADING, status]);

  async function removeClient(id: number) {
    setStatus(formStatus.LOADING);
    await remove(ref(database, `clients/${id}`));
    setStatus(formStatus.DONE);
    setDataClient(dataClient);
  }

  return (
    <TableContainer
      {...propsDoModal}
    >
      <THead>
        <TR>
          <TH>Telefone</TH>
          <TH>Rua</TH>
          <TH>Número</TH>
          <TH>Opções</TH>
        </TR>
      </THead>

      <TBody>
        {statusLoading === formStatus.LOADING && (
        <TR>
          <TD>
            <WrapperDialog>
              <Lottie
                width="50px"
                options={{
                  animationData: loading,
                  loop: true,
                }}
              />
              <span>Aguarde...</span>
            </WrapperDialog>
          </TD>
        </TR>
        )}
        {Object.keys(dataClient).length === 0 && statusLoading === formStatus.DEFAULT && (
        <TR>
          <TD>
            <WrapperDialog>
              <Lottie
                width="50px"
                options={{
                  animationData: notData,
                  loop: true,
                }}
              />
            </WrapperDialog>
          </TD>
        </TR>
        )}

        {myKys.map((key) => (
          <TR key={key}>
            <TD>
              {dataClient[`${key}`].cellfone}
            </TD>
            <TD>
              {dataClient[`${key}`].street}
            </TD>

            <TD>
              {dataClient[`${key}`].number}
            </TD>
            <TD>
              <Button
                background="#e3473c"
                onClick={() => removeClient(Number(key))}
              >
                Excluir
              </Button>
            </TD>
          </TR>
        ))}
      </TBody>
    </TableContainer>
  );
}
