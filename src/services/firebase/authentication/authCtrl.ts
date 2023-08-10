import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { auth } from '../../../../firebase';
import { createUserData } from '../userCtrls/userCtrl';

type TUpdateUserProfile = (user: User, name: string, photoURL: string) => void;

export const updateUserProfile: TUpdateUserProfile = (user, name, photoURL) => {
  if (user) {
    updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });
  }
};

export const registerUser = (email: string, password: string) => {
  // in onSignUp
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      const defaultAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgYpOOYgMxD_FO9y7jYv2F_DwMnnVMBj8rWQ&usqp=CAU';
      updateUserProfile(user, email, defaultAvatar);
      createUserData(user, email, email, defaultAvatar, user.uid);
    })
    .catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
};
