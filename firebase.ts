import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';

import { decode } from 'base-64';

if (typeof atob === 'undefined') {
  global.atob = decode;
}

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
const storage = getStorage();

const addDataToFirebase = async (collectionName: string, data: any) => {
  await addDoc(collection(dbFirestore, collectionName), data);
};

// ============

const storageRef = ref(storage, 'images');

const uploadImgToStorage = async (img: any, setter: any) => {
  const uploadResult = uploadString(storageRef, img, 'base64');
  await uploadResult.then(
    (snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setter(downloadURL);
      });
    },
    (error) => {
      console.log(error);

      // switch (error.code) {
      //   case 'storage/unauthorized':
      //     console.log('user is unauthorized');
      //     break;
      //   case 'storage/canceled':
      //     console.log('User canceled the upload');
      //     break;
      //   case 'storage/unknown':
      //     console.log('Unknown error occurred, inspect error.serverResponse');
      //     break;
      // }
    }
  );
};

export { auth, database, dbFirestore, addDataToFirebase, uploadImgToStorage };
