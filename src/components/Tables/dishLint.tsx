import React, { useState, useEffect } from 'react';
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

export default function DishList({ propsDoModal }) {
  const [dataDish, setDataDish] = useState({});
  const myKys = Object.keys(dataDish);
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
    get(child(dbRef, 'dishs/'))
      .then((snapshot) => snapshot)
      .then((values) => {
        if (values.val() !== null) {
          setDataDish(values.val());
          setStatus(true);
          setStatusLoading(formStatus.DONE);
        } else {
          setDataDish({});
          setStatus(false);
          setStatusLoading(formStatus.DEFAULT);
        }
      })
      .catch(() => {
        setStatusLoading(formStatus.ERROR);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbRef, status]);

  async function removeDish(id: number) {
    setStatus(formStatus.LOADING);
    if (window.confirm('Tem certeza que deseja excluir')) {
      await remove(ref(database, `dishs/${id}`));
      setStatus(formStatus.DONE);
    }
  }

  return (

    <TableContainer
      {...propsDoModal}
    >
      <THead>
        <TR>
          <TH>Imagem</TH>
          <TH>Prato</TH>
          <TH>Valor</TH>
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
        {Object.keys(dataDish).length === 0 && statusLoading === formStatus.DONE && (
          <TR>
            <TD>
              <>
                <WrapperDialog>
                  <Lottie
                    width="50px"
                    options={{
                      animationData: notData,
                      loop: true,
                    }}
                  />
                </WrapperDialog>
              </>
            </TD>
          </TR>
        )}
        {myKys.map((key) => (
          <TR key={key}>
            <TD>
              <img src={dataDish[`${key}`].path_img} alt={dataDish[`${key}`].dish_name} />
            </TD>
            <TD>
              {dataDish[`${key}`].dish_name}
            </TD>
            <TD>
              {dataDish[`${key}`].price}
            </TD>
            <TD>
              <Button
                background="#e3473c"
                onClick={() => removeDish(Number(key))}
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
