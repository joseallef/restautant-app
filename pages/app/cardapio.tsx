import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../src/components/Header';
import Card from '../../src/components/Card';
import Box from '../../src/components/commons/Box';
import {
  database, ref, get, child, auth,
} from '../../src/services/firebase';
import { useAuth } from '../../src/hooks';
import { parseCookies } from 'nookies';
import { Label } from '../../src/components/commons/WrapperDialog/style';
import { authLogin } from '../../src/auth';

type dataType = {
  data: {
    valuePlates: {
      [key: string]: string;
      dish_name: string;
      path_img: string,
      price: string,
    },
    valueDrink: {
      [key: string]: string,
      drink_name: string,
      path_img: string,
      price: string,
      
    },
    token: string,
  }
};

export default function Home({ data }: dataType) {
  const keysPlates = Object.keys(data.valuePlates);
  const keysDrinks = Object.keys(data.valueDrink);
  const router = useRouter();
  const { dataUser } = useAuth();
  const cookies = parseCookies();
  
  useEffect(() => {    
    // console.log(' = > access-token', dataUser?.access_token, ' = > token', cookies.ACCESS_TOKEN, auth.currentUser?.accessToken)
    if (data.token !== auth.currentUser?.accessToken) {
      router.push('/');
    }
  }, []);
  
  // console.log(auth.currentUser?.accessToken);
  return (
    <>
      <Header />
      <Box>
        {
          keysPlates.map((key) => (
            <Card
              key={key}
              name={data.valuePlates[`${key}`].dish_name}
              img={data.valuePlates[`${key}`].path_img}
              price={data.valuePlates[`${key}`].price}
              index={Number(key)}
            />
          ))
        }

      </Box>
      <Box>
        <Label>Bebidas</Label>
        {
          keysDrinks.map((key) => (
            <Card
              key={key}
              name={data.valueDrink[`${key}`].drink_name}
              img={data.valueDrink[`${key}`].path_img}
              price={data.valueDrink[`${key}`].price}
              index={Number(key)}
            />
          ))
        }
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx) {

  const auth = authLogin(ctx);
  const token = await auth.getToken();
  
  const dbRef = ref(database);
  const valuePlates = await get(child(dbRef, 'dishs/'))
    .then((values) => values.val())
    .catch((e) => {
      throw new Error('Oooppss (:');
      
    });
    const valueDrink = await get(child(dbRef, 'drinks/'))
    .then((values) => values.val())
    .catch((e) => {
      throw new Error('Oooppss (:');
      
    });
  return {
    props: {
      data: {
        valuePlates,
        valueDrink,
        token,
      },
    },
  }
}
