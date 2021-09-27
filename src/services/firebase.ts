import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import databaseteste, {
  getDatabase, ref, set, get, child, remove, orderByChild, query,
  onValue, equalTo, orderByKey, startAt, startAfter, endAt, limitToLast,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAUWCrQjktHPKtzADJfQLb_Scz_uMAxtLg',
  authDomain: 'restaurant-app-7fb05.firebaseapp.com',
  projectId: 'restaurant-app-7fb05',
  storageBucket: 'restaurant-app-7fb05.appspot.com',
  messagingSenderId: '1054985027371',
  appId: '1:1054985027371:web:7f2bcddfd14126d6c24f6e',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

export {
  app, auth, database, ref, set, get, child, remove,
  databaseteste, orderByChild, query, orderByKey, equalTo, startAt, startAfter, endAt, limitToLast,
};
