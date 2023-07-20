import React, { useCallback, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  Keyboard,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IAuthScreenProps, TRegistration } from '../../interfaces';

import s from './Registration.styles';

const Registration = ({
  navigation,
  route,
}: IAuthScreenProps<'Registration'>) => {
  const [isSecured, setIsSecured] = React.useState(true);
  const [value, setValue] = React.useState<TRegistration>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isConfirmPassword, setConfirmPassword] =
    React.useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsSecured(!isSecured);
  };

  const checkPassword = useCallback(() => {
    const confirmPassword =
      String(value.password) === String(value.confirmPassword);

    const isConfirmPassword =
      confirmPassword &&
      value.password.length > 4 &&
      value.confirmPassword.length === value.password.length;

    if (!isConfirmPassword) {
      setConfirmPassword(false);
      return;
    }
    setConfirmPassword(true);
  }, [value]);

  const theme = useAppTheme();
  useEffect(() => {
    if (value.password.length > 4 && value.confirmPassword.length > 4) {
      checkPassword();
    }
  }, [value]);

  return (
    <ScrollView
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
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            right={
              <TextInput.Icon icon="account" iconColor={theme.colors.primary} />
            }
          />
          <TextInput
            mode="outlined"
            label="Password"
            textContentType="newPassword"
            secureTextEntry={isSecured}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            right={
              <TextInput.Icon
                icon={isSecured ? 'eye-off' : 'eye'}
                iconColor={theme.colors.primary}
                onPress={togglePasswordVisibility}
              />
            }
          />
          <TextInput
            mode="outlined"
            label="Confirm password"
            value={value.confirmPassword}
            onChangeText={(text) =>
              setValue({ ...value, confirmPassword: text })
            }
            secureTextEntry={isSecured}
          />
          <HelperText
            type="error"
            visible={!isConfirmPassword && value.confirmPassword.length > 2}
          >
            Password is invalid, try again!
          </HelperText>
        </View>
        <Button
          style={s(theme).buttonContent}
          disabled={isConfirmPassword && value.email.length > 4 ? false : true}
          dark={true}
          mode="contained"
          uppercase={true}
          onPress={() => {
            console.log('confirmPassword', isConfirmPassword);
            console.log('Send data to server');
          }}
        >
          Complete
        </Button>
        <Pressable
          style={s(theme).registrationLinkBox}
          onPress={() => {
            console.log('go to Registration page');
            navigation.navigate('Login');
          }}
        >
          <Text style={s(theme).registrationLinkText}>Back to Sign in</Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Registration;
