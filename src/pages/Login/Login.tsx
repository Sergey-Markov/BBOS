import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';
import LabelBtn from '../../components/shared/LabelBtn/LabelBtn';
import {
  FORGOT_PASSWORD_LINK_LABEL,
  LOGIN_BTN_LABEL,
  REGISTRATION_LINK_LABEL,
} from '../../constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IAuthScreenProps } from '../../interfaces';
import {
  authSelector,
  setAuthStatus,
  TAuthorizedStatus,
} from '../../redux/reducers/authReducer';

import s from './Login.styles';

const store = async () => {
  const isChecked = await getValueFromSecureStore('checked');
  const storeEmail = await getValueFromSecureStore('email');
  const storePassword = await getValueFromSecureStore('password');

  return { isChecked, storeEmail, storePassword };
};

const SECONDARY_BTNS = [
  {
    title: 'log in with facebook',
    icon: 'facebook',
  },
  {
    title: 'log in with apple',
    icon: 'apple',
  },
  {
    title: 'log in with google',
    icon: 'google',
  },
];

const saveToSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};
const deleteFromSecureStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const getValueFromSecureStore = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    // alert('No values stored under that key.');
    return '';
  }
};

const Login = ({ navigation, route }: IAuthScreenProps<'Login'>) => {
  const [checked, setChecked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [isSecured, setIsSecured] = useState(true);
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const authStatus = useSelector(authSelector);

  const togglePasswordVisibility = () => {
    setIsSecured(!isSecured);
  };

  const checkHandler = async () => {
    setChecked(!checked);
    if (!checked && userEmail.length > 3 && userPassword.length > 5) {
      console.log('saved');

      await saveToSecureStore('email', userEmail);
      await saveToSecureStore('password', userPassword);
      await saveToSecureStore('checked', '1');
    }
    if (checked) {
      console.log('delete');
      await deleteFromSecureStore('email');
      await deleteFromSecureStore('password');
      await deleteFromSecureStore('checked');
    }
  };

  useEffect(() => {
    const getStore = async () => {
      try {
        const secureStore = await store();
        if (
          secureStore.isChecked === '' ||
          secureStore.storeEmail === '' ||
          secureStore.storePassword === ''
        ) {
          return;
        }

        setChecked(true);
        setUserEmail(secureStore.storeEmail);
        setUserPassword(secureStore.storePassword);
      } catch (error) {
        return;
      }
    };
    getStore();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const statusAutorized: TAuthorizedStatus = {
          currentAuthorizedStatus: 'Authorized',
        };
        dispatch(setAuthStatus(statusAutorized));
      } else {
        Alert.alert('need autorized');
      }
    });
    return unsubscribe;
  }, []);

  const singinHandler = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && checked) {
          const statusAutorized: TAuthorizedStatus = {
            currentAuthorizedStatus: 'Authorized',
          };
          try {
            getValueFromSecureStore('email').then((value) => {
              console.log(value);
            });
          } catch {
            console.log('nothing');
          }
          dispatch(setAuthStatus(statusAutorized));
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      style={s(theme).scroll}
      onScroll={Keyboard.dismiss}
      scrollEventThrottle={16}
    >
      <SafeAreaView style={s(theme).container}>
        <View style={s(theme).titleContainer}>
          <Text style={s(theme).titleText}>OS.</Text>
          <Text style={s(theme).titleTextSecondary}>community</Text>
        </View>
        <View style={s(theme).formContainer}>
          <TextInput
            mode="outlined"
            label="Email or phone number"
            placeholder="email@gmail.com"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
            right={
              <TextInput.Icon icon="account" iconColor={theme.colors.primary} />
            }
          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry={isSecured}
            keyboardType="email-address"
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
            right={
              <TextInput.Icon
                icon={isSecured ? 'eye-off' : 'eye'}
                iconColor={theme.colors.primary}
                onPress={togglePasswordVisibility}
              />
            }
          />
        </View>
        <View style={s(theme).rememberBox}>
          <Pressable style={s(theme).formCheckbox}>
            <Checkbox.Item
              position="leading"
              mode="android"
              status={checked ? 'checked' : 'unchecked'}
              uncheckedColor={theme.colors.secondary}
              label="Remember me"
              labelVariant="titleSmall"
              onPress={checkHandler}
            />
          </Pressable>
          <LabelBtn onPress={() => console.log('Press Forgot password')}>
            <Text style={s(theme).forgotPassword}>
              {FORGOT_PASSWORD_LINK_LABEL}
            </Text>
          </LabelBtn>
        </View>

        <LabelBtn
          label={LOGIN_BTN_LABEL}
          mode="contained"
          bordered
          onPress={() => singinHandler()}
        />
        <View style={s(theme).btnsGroupe}>
          {SECONDARY_BTNS.map((btn, index) => (
            <LabelBtn
              key={index}
              label={btn.title}
              mode="contained"
              bordered
              secondary
              icon={btn.icon}
              onPress={() => console.log('Pressed')}
            />
          ))}
        </View>
        <LabelBtn
          onPress={() => {
            navigation.navigate('Registration');
          }}
        >
          <Text style={s(theme).forgotPassword}>{REGISTRATION_LINK_LABEL}</Text>
        </LabelBtn>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
