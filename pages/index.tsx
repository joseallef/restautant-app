import React from 'react';
import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Box from '../src/components/commons/Box';
import {
  database, ref, get, child,
} from '../src/services/firebase';

type dataType = {
  data: [
    dish_name: string,
    path_img: string,
    price: string,

  ]
};

export default function Home({ data }: dataType) {
  const keys = Object.keys(data);
  return (
    <>
      <Header />
      <Box>
        {
          keys.map((key) => (
            <Card
              key={key}
              name={data[`${key}`].dish_name}
              img={data[`${key}`].path_img}
              price={data[`${key}`].price}
              index={Number(key)}
            />
          ))
        }
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const dbRef = ref(database);
  const value = await get(child(dbRef, 'dishs/'))
    .then((values) => values.val())
    .catch((e) => {
      throw new Error('Oooppss (:');
      
    });
  return {
    props: {
      data: value,
    },
    revalidate: 30,
  }
}
