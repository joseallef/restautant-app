import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Box from '../src/components/commons/Box';
import {
  database, ref, get, child,
} from '../src/services/firebase';

export default function Home() {
  const [dataDish, setDataDish] = useState({});
  const keys = Object.keys(dataDish);
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, 'dishs/'))
      .then((snapshot) => snapshot)
      .then((values) => setDataDish(values.val()))
      .catch((e) => {
        console.error(e);
      });
  }, [dbRef]);

  return (
    <>
      <Header />
      <Box>
        {
          keys.map((key) => (
            <Card
              key={key}
              name={dataDish[`${key}`].dish_name}
              img={dataDish[`${key}`].path_img}
              price={dataDish[`${key}`].price}
              index={key}
            />
          ))
        }
      </Box>
    </>
  );
}
