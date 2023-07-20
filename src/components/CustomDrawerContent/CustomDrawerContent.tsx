import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../hooks/useAppTheme';
import { userDataMock } from '../../mocks/userDataMock';

import s from './CustomDrawerContent.styles';

interface ICustomDrawerContentProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}

const DRAWER_ITEMS = [
  {
    id: 0,
    label: 'Telephone Directory',
    screen: 'TelephoneDirectory',
  },
  {
    id: 1,
    label: 'Servicing',
    screen: 'Servicing',
  },
  {
    id: 2,
    label: 'Settings',
    screen: 'Settings',
  },
  {
    id: 3,
    label: 'Details',
    screen: 'Details',
  },
  {
    id: 4,
    label: 'QR Scanner',
    screen: 'Scanner',
  },
];

const CustomDrawerContent = (props: ICustomDrawerContentProps) => {
  const { navigation } = props;
  const [userData, setUserData] = useState(userDataMock);
  const theme = useAppTheme();

  return (
    <DrawerContentScrollView
      contentContainerStyle={s(theme).drawerItemContainer}
    >
      <Pressable
        style={s(theme).container}
        onPress={() => navigation.navigate('Profile', { user: userData })}
      >
        <Image style={s(theme).img} source={{ uri: userData.avatar }} />
        <View>
          <Text variant="titleLarge" style={s(theme).userName}>
            {userData.name}
          </Text>
          <Text variant="titleLarge" style={s(theme).userPhone}>
            {userData.phone}
          </Text>
        </View>
      </Pressable>
      {DRAWER_ITEMS.map((item) => (
        <DrawerItem
          key={item.id}
          label={item.label}
          onPress={() => navigation.navigate(item.screen)}
        />
      ))}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
