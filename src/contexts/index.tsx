import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { auth, signInWithPopup, GoogleAuthProvider, database, ref, get,
  orderByChild, query, equalTo, signInWithEmailAndPassword } from '../services/firebase';
import { setCookie, destroyCookie } from 'nookies';
import { useSession } from 'next-auth/client';

type User = {
  id: string;
  name: string | null;
  email?: string | null;
  accessToken: string;
};

type AuthContextType = {
  dataUser: User | undefined;
  loginWithGoogle: () => Promise<void>;
  authWithFirebase: (email: string, password: string) => Promise<boolean | undefined>;
};

type PropsWithProvider = {
  children: ReactNode;
};
type UserType = {
  user: {
    email: string,
    accessToken: string;
  }
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: PropsWithProvider) {
  const [dataUser, setDataUser] = useState<User>();
  const [userExists, setUserExists] = useState(false);
  const [session] = useSession();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user){
        destroyCookie(null, 'ACCESS_TOKEN', { path: '/' });
      } else {
        const { displayName, email, accessToken, uid } = user;
        setDataUser({
          id: uid,
          name: displayName,
          email: email,
          accessToken: accessToken,
        });
      } 
    });
    
    // return () => {
    //   unsubscribe();
    // }

  }, []);

  async function authWithFirebase(email: string, password: string) {

    const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user) {
        setUserExists(true);
        setCookie(null, 'ACCESS_TOKEN', `${userCredential.user.accessToken}`, {
          maxAge: 60 * 60 * 24,
          path: '/',
        });
        return true;
      }
    }).catch(() => {
      console.log('Ops error: (:');
      return false;
    });
    return response;
  };

  async function loginWithGoogle() {
    try {

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const dbRef = ref(database, 'users');
      
      const values = await query(ref(database, 'users/user'), orderByChild('email'), equalTo(result.user.email));
        get(values)
        .then((snapshot) => snapshot.val())
        .catch((e) => {
          throw new Error('Oooppss (:');
    
        });
        const keys = Object.keys(values);
      
      const res = keys.map((key) => {
        if (result.user.email === values.[`${key}`].email) {   
          
            if (result.user) {
              const { displayName, email, accessToken, uid } = result.user;

              setCookie(null, 'ACCESS_TOKEN', `${accessToken}`, {
                maxAge: 60 * 60 * 24,
                path: '/cardapio',
              });     
              
              setDataUser({
                id: uid,
                name: displayName,
                email: email,
                accessToken: accessToken,
              });
            }
        }
      });

    } catch (error) {
      // console.log(error, 'Eroor');
      throw new Error('Oooppss (:');
    }
  }

  return (
    <AuthContext.Provider value={{ dataUser, loginWithGoogle, authWithFirebase }}>
      {children}
    </AuthContext.Provider>
  )
};
