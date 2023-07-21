import React, { useState } from 'react';
import { Pressable, Text, View, Keyboard, ScrollView } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LabelBtn from '../../components/shared/LabelBtn/LabelBtn';
import {
  FORGOT_PASSWORD_LINK_LABEL,
  LOGIN_BTN_LABEL,
  REGISTRATION_LINK_LABEL,
} from '../../constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IAuthScreenProps } from '../../interfaces';

import s from './Login.styles';

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

const Login = ({ navigation, route }: IAuthScreenProps<'Login'>) => {
  const [checked, setChecked] = useState(false);
  const [isSecured, setIsSecured] = useState(true);
  const theme = useAppTheme();

  const togglePasswordVisibility = () => {
    setIsSecured(!isSecured);
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
            right={
              <TextInput.Icon icon="account" iconColor={theme.colors.primary} />
            }
          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry={isSecured}
            keyboardType="email-address"
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
              onPress={() => {
                setChecked(!checked);
              }}
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
          onPress={() => console.log('Pressed')}
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
