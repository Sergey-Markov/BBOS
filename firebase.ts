import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  QueryOrderByConstraint,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrFHeBpBYFcNUzmjzvQHdjoaGD_nWjfwQ',
  authDomain: 'os-community.firebaseapp.com',
  projectId: 'os-community',
  storageBucket: 'os-community.appspot.com',
  messagingSenderId: '791613670809',
  appId: '1:791613670809:web:7404e10448c900f4c4bf08',
  databaseURL:
    'https://os-community-default-rtdb.europe-west1.firebasedatabase.app/',
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const dbFirestore = getFirestore();
const baseUrl = database.app.options.databaseURL;

const addDataToFirebase = async (collectionName: string, data: any) => {
  await addDoc(collection(dbFirestore, collectionName), data);
};

export { auth, database, baseUrl, dbFirestore, addDataToFirebase };
