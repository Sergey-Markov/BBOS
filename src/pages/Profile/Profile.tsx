import React, { useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IScreenProps } from '../../interfaces';

import s from './Profile.styles';

const Profile = ({ navigation, route }: IScreenProps<'Profile'>) => {
  const theme = useAppTheme();
  if (!route.params?.user) {
    return null;
  }

  const { name, avatar, email, phone, address, city, state, country, room } =
    route.params?.user;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, []);

  const addressString = `${address}, ${room}, ${city}, ${state}, ${country}`;
  return (
    <ScrollView contentContainerStyle={s(theme).container}>
      <Image style={s(theme).img} source={{ uri: avatar }} />
      <View style={s(theme).textBox}>
        <Text style={s(theme).userName}>{name}</Text>
        <Text style={s(theme).otherDataText}>{phone}</Text>
        <Text style={s(theme).otherDataText}>{email}</Text>
        <Text style={s(theme).otherDataText}>{addressString}</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;
