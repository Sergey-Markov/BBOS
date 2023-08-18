import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
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
const database = getDatabase();
const dbFirestore = getFirestore();
const storage = getStorage();

const addDataToFirebase = async (collectionName: string, data: any) => {
  await addDoc(collection(dbFirestore, collectionName), data);
};

const uploadImgToStorage = async (
  img: any,
  name: string,
  typeOfContent: string,
  newNewsPost: {
    title: string;
    description: string;
    link: string;
    publishedAt: number;
    img: { uri: string; name: string; storageLink: string };
    id: string;
    user: { id: string | undefined; name: string | null | undefined };
  },
  goBack: () => void
) => {
  const storageRef = ref(storage, `images/${name}`);
  const response = await fetch(img.uri);
  const blob = await response.blob();

  const metadata = {
    contentType: `image/${typeOfContent}`,
  };
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log(error.message, error.code);
    },
    async () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const newDataPost = {
          ...newNewsPost,
          img: {
            uri: newNewsPost.img.uri,
            name: newNewsPost.img.name,
            storageLink: downloadURL,
          },
        };
        await addDataToFirebase('communityNews', newDataPost);
        goBack();
        console.log('File available at', downloadURL);
      });
    }
  );
};

export {
  auth,
  database,
  dbFirestore,
  addDataToFirebase,
  uploadImgToStorage,
  storage,
};
