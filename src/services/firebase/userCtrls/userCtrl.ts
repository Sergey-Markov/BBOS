import { Auth, User } from 'firebase/auth';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { auth, database } from '../../../../firebase';

type TUpdateUserData = (
  user: User,
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  userId: string,
  phone?: string
) => void;

database.app.automaticDataCollectionEnabled.valueOf;

const dbRef = ref(getDatabase());

export const createUserData: TUpdateUserData = (
  user,
  displayName,
  email,
  photoURL,
  userId,
  phone = ''
) => {
  if (user) {
    set(ref(database, 'users/' + userId), {
      displayName,
      email,
      photoURL,
      uid: userId,
      phoneNumber: phone,
    });
  }
};

export const getUsers = () => {
  get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getUserById = (userId: string) => {
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
