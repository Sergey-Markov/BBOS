import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import goToUrl from '../../../utils/goToUrl';

import s from './TaxiServiceItem.styles';

interface ITaxiServiceItemProps {
  item: {
    id?: number | string;
    name: string;
    tel: string[];
    url: string;
  };
}

const TaxiServiceItem = ({ item }: ITaxiServiceItemProps) => {
  const { name, tel, url } = item;
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
      </View>
    </View>
  );
};

export default TaxiServiceItem;
