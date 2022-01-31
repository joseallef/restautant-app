// import { parseCookies, setCookie } from 'nookies';
// import { auth, onAuthStateChanged } from '../../../src/services/firebase';

// export const authLogin = (ctx: any) => {
//   const cookies = parseCookies(ctx);
//   const token = cookies.ACCESS_TOKEN;
//   const ag = auth.onAuthStateChanged(user => {
//     console.log('user', user);
//   });
//   const dataUser = true;

//   return {

//     async getToken() {
//       // const session = await getSession();
//       // // return cookies.ACCESS_TOKEN;
//       console.log('token', token);
//       return token;
//     },

//     async login(token: string) {
//       // console.log('token', token);
//       setCookie(null, 'ACCESS_TOKEN', `${token}`, {
//         maxAge: 60 * 60 * 24,
//         path: '/cardapio',
//       });
//     },

//     async hasActiveSession() {
      
//       // const unsubscribe = auth.onAuthStateChanged(user => user);
//       // return () => {
//       //   unsubscribe();
//       // }
//       // console.log(unsubscribe());
//       if(token == auth.currentUser?.accessToken) {
//         console.log('Session active', token, auth);
//         return true;
//       } else {
//         console.log('Session not active', token, ag);
//         return false;
//       }
  
//     },
//     // async logout(ctx, destroyCookieModule = destroyCookie) {
//     //   destroyCookieModule(ctx, 'ACCESS_TOKEN', { path: '/' });
//     // }
//   };
// };

