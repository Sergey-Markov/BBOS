import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import goToUrl from '../../../utils/goToUrl';
import openGoogleMapHandler from '../../../utils/openGoogleMapHandler';

import s from './FoodServiceItem.styles';

interface IFoodServiceItemProps {
  item: {
    id?: number | string;
    name: string;
    tel: string[];
    url: string;
    address: string;
  };
}

const FoodServiceItem = ({ item }: IFoodServiceItemProps) => {
  const { name, tel, url, address } = item;
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
          icon="web"
          onPress={() => goToUrl(url)}
          iconColor={theme.colors.primary}
        />
        <IconButton
          icon="google-maps"
          onPress={() => openGoogleMapHandler(address)}
          iconColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export default FoodServiceItem;
