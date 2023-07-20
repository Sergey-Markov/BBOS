import React from 'react';
import { Pressable, Text, View, Keyboard, ScrollView } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IAuthScreenProps } from '../../interfaces';

import s from './Login.styles';

const secondaryBtns = [
  {
    title: 'log in with facebook',
    icon: 'facebook',
    onPress: () => console.log('Pressed facebook'),
  },
  {
    title: 'log in with apple',
    icon: 'apple',
    onPress: () => console.log('Pressed apple'),
  },
  {
    title: 'log in with google',
    icon: 'google',
    onPress: () => console.log('Pressed google'),
  },
];

const Login = ({ navigation, route }: IAuthScreenProps<'Login'>) => {
  const [checked, setChecked] = React.useState(false);
  const [isSecured, setIsSecured] = React.useState(true);

  route.params?.screen;

  const togglePasswordVisibility = () => {
    setIsSecured(!isSecured);
  };

  const theme = useAppTheme();
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
          <View style={s(theme).formCheckbox}>
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
          </View>
          <Pressable onPress={() => console.log('Press Forgot password')}>
            <Text style={s(theme).forgotPassword}>Forgot password?</Text>
          </Pressable>
        </View>
        <Button
          style={s(theme).buttonContent}
          dark={true}
          mode="contained"
          uppercase={true}
          onPress={() => console.log('Pressed')}
        >
          Log in
        </Button>
        <View style={s(theme).btnsGroupe}>
          {secondaryBtns.map((btn, index) => (
            <Button
              key={index}
              style={s(theme).secondaryBtn}
              dark={true}
              mode="contained"
              uppercase={true}
              onPress={btn.onPress}
              icon={btn.icon}
            >
              {btn.title}
            </Button>
          ))}
        </View>
        <Pressable
          style={s(theme).registrationLinkBox}
          onPress={() => {
            console.log('go to Registration page');
            navigation.navigate('Registration');
          }}
        >
          <Text style={s(theme).forgotPassword}>
            Don`t have an account? Sign up
          </Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
