import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import openGoogleMapHandler from '../../../utils/openGoogleMapHandler';

import s from './CommonServicesItem.styles';

interface ICommonServicesItemProps {
  item: {
    id?: number | string;
    name: string;
    tel: string[];
    address: string;
  };
}

const CommonServicesItem = ({ item }: ICommonServicesItemProps) => {
  const { name, tel, address } = item;
  const theme = useAppTheme();

  return (
    <View style={s(theme).foodWrapper}>
      <View>
        <Text variant="titleLarge" style={s(theme).service}>
          {name}
        </Text>
      </View>
      <View style={s(theme).iconsBox}>
        <IconButton icon="phone" onPress={() => callPhoneHandler(tel)} />
        <IconButton
          icon="google-maps"
          onPress={() => openGoogleMapHandler(address)}
          iconColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export default CommonServicesItem;
