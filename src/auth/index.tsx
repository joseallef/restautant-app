import { parseCookies, setCookie } from 'nookies';
import { getSession, session } from 'next-auth/client';
import jwt from 'jsonwebtoken';
import {
  database, ref, get, child, auth,
} from '../../src/services/firebase';

export const authLogin = (ctx) => {
  const cookie = parseCookies(ctx);
  const token = cookie['ACCESS_TOKEN'];

  const dataUser = true;

  return {

    async getToken() {
      // const cookies = parseCookies();
      // console.log(token);
      // auth.onAuthStateChanged(user => {
      //   const token = ctx.req.headers.cookie.split(" ");
      // // console.log(cookie['ACCESS_TOKEN']);
      // });


      // // const session = await getSession();
      // // // return cookies.ACCESS_TOKEN;
      // console.log('cookies2', session);
      return token;
    },

    async login(token: string) {
      // console.log('token', token);
      setCookie(null, 'ACCESS_TOKEN', `${token}`, {
        maxAge: 60 * 60 * 24,
        path: '/cardapio',
      });
    },

    async hasActiveSession() {
      if (ctx.req.headers.cookie) {
        const res = ctx.req.headers.cookie.split(' ');
        const result = res[2].replace(/ACCESS_TOKEN=/, '');
        if (result === token) {
          return token;
        } else {
          return false;
        }
      } else {
        return false;
      }  
    },

    async getSession() {
      const session = jwt.decode(token);
      return session;
    }

    // async logout(ctx, destroyCookieModule = destroyCookie) {
    //   destroyCookieModule(ctx, 'ACCESS_TOKEN', { path: '/' });
    // }
  };
};

