import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { Alert } from 'react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCrFHeBpBYFcNUzmjzvQHdjoaGD_nWjfwQ',
  authDomain: 'os-community.firebaseapp.com',
  projectId: 'os-community',
  storageBucket: 'os-community.appspot.com',
  messagingSenderId: '791613670809',
  appId: '1:791613670809:web:7404e10448c900f4c4bf08',
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const register = (email: string, password: string) => {
  // in onSignUp
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(user, {
        displayName: email,
        photoURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgYpOOYgMxD_FO9y7jYv2F_DwMnnVMBj8rWQ&usqp=CAU',
      });
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
};

export { auth, register };
