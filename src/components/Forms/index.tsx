import React, { useState, useContext, ReactNode } from 'react';
import Lottie from 'lottie-react-web';
import TextField from './TextField';
import loading from '../../../public/icon/loading-spinner.json';

import {
  database, ref, get, child, orderByChild, query, orderByKey, equalTo, startAt,
  startAfter, endAt, limitToLast,
} from '../../services/firebase';

import {
  TableContainer, THead, TR, TH, TBody, TD, WrapperDialog,
} from '../Tables/style';
import { WrapperForm } from './style';
import { WebContext } from '../../wrappers/context';

export default function FormShearchRegistration({ onClose, propsDoModal }): JSX.Element {
  const [dataClient, setDataClient] = useState({});
  const { setSelectedAndres, toggleDialog } = useContext(WebContext);
  const myKys = Object.keys(dataClient);

  const [data, setData] = useState({
    celphone: '',
  });

  const formStatus = {
    DEFAULT: 'DEFAULT',
    LOADING: 'LOADING',
    DONE: 'DONE',
    ERROR: 'ERROR',
  };
  const [statsLoading, setStatsLoading] = useState(formStatus.DEFAULT);

  const numMin = data.celphone.length > 2;

  function handleChange(event: ReactNode) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value } = event.target;
    const fieldName = event.target.getAttribute('name');
    setData({
      ...data, [fieldName]: value,
    });

    if (numMin) {
      const valor = query(ref(database, 'clients'), orderByChild('cellfone'), startAt(value), limitToLast(10));
      setStatsLoading(formStatus.LOADING);
      get(valor)
        .then((snapshot) => snapshot)
        .then((values) => {
          if (values.val() !== null) {
            setDataClient(values.val());
            setStatsLoading(formStatus.DONE);
          } else {
            setDataClient({});
            setStatsLoading(formStatus.ERROR);
          }
        })
        .catch((e) => {
          console.error(e);
          setStatsLoading(formStatus.ERROR);
        });
    }
  }

  // get(child(dbRef, 'clients/').orderByChild());

  // const valor = query(ref(database, 'clients'), orderByChild('cellfone'), startAt('9599'));
  // get(valor).then((v) => console.log(v.val()));
  // // console.log(valor.ref);

  // useEffect(() => {
  //   setStatsLoading(formStatus.LOADING);
  //   get(child(dbRef, 'clients/'))
  //     .then((snapshot) => snapshot)
  //     .then((values) => {
  //       if (values.val() !== null) {
  //         setDataClient(values.val());
  //         setStatsLoading(formStatus.DONE);
  //       } else {
  //         setDataClient({});
  //         setStatsLoading(formStatus.ERROR);
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       setStatsLoading(formStatus.ERROR);
  //     });
  // }, [dbRef, data.celphone, formStatus.LOADING, formStatus.ERROR, formStatus.DONE]);

  // console.log(dataClient);

  return (
    <WrapperForm
      {...propsDoModal}
    >
      <form>
        <TextField
          tag="text"
          name="celphone"
          value={data.celphone}
          placeholder="(11) 99999-9999"
          onChange={handleChange}
        />
      </form>
      <TableContainer
        {...propsDoModal}
      >
        <THead>
          <TR>
            <TH>Telefone</TH>
            <TH>Rua</TH>
            <TH>Número</TH>
          </TR>
        </THead>
        {numMin && (
          <TBody>
            {statsLoading === formStatus.LOADING && Object.keys(dataClient).length !== 0 && (
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
            {myKys.map((key) => (
              <TR
                key={key}
                onClick={() => {
                  setSelectedAndres(dataClient[`${key}`]);
                  onClose(false);
                  toggleDialog();
                }}
              >
                <TD>
                  {dataClient[`${key}`].cellfone}
                </TD>
                <TD>
                  {dataClient[`${key}`].street}
                </TD>
                <TD>
                  {dataClient[`${key}`].number}
                </TD>
              </TR>
            ))}
          </TBody>
        )}
      </TableContainer>
    </WrapperForm>
  );
}
