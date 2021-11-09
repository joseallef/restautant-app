import { parseCookies, setCookie } from 'nookies';
import { getSession } from 'next-auth/client';

export const authLogin = () => {

  const dataUser = true;

  return {

    async getToken() {
      const cookies = parseCookies();
      // const session = await getSession();
      // // return cookies.ACCESS_TOKEN;
      // console.log('cookies2', cookies);
      return cookies.ACCESS_TOKEN;
    },

    async login(token: string) {
      // console.log('token', token);
      setCookie(null, 'ACCESS_TOKEN', `${token}`, {
        maxAge: 60 * 60 * 24,
        path: '/cardapio',
      });
    },

    async hasActiveSession() {

      if(dataUser) {
        // console.log('Session active', cookies);
        return true;
      } else {
        console.log('Session not active');
        return false;
      }
  
    },
    // async logout(ctx, destroyCookieModule = destroyCookie) {
    //   destroyCookieModule(ctx, 'ACCESS_TOKEN', { path: '/' });
    // }
  };
};

