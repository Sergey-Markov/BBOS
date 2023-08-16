import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import goToUrl from '../../../utils/goToUrl';
import openGoogleMapHandler from '../../../utils/openGoogleMapHandler';

import s from './FoodServiceItem.styles';
import { TFoodServiceItem } from '../../../pages/Servicing/Servicing';

interface IFoodServiceItemProps {
  item: TFoodServiceItem;
}

const BTNS_ARR = [
  {
    id: '1',
    iconName: 'phone',
    onPress: (tel?: string[] | string) => callPhoneHandler(tel as string[]),
  },
  {
    id: '2',
    iconName: 'web',
    onPress: (url?: string[] | string) => goToUrl(url as string),
  },
  {
    id: '3',
    iconName: 'google-maps',
    onPress: (address?: string[] | string) =>
      openGoogleMapHandler(address as string),
  },
];

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
        {BTNS_ARR.map(({ id, iconName, onPress }) => {
          const isphoneItem = iconName === 'phone';
          const isUrlItem = iconName === 'web';
          const currentStrParam = isUrlItem ? url : address;
          const currentParamPressHandler = isphoneItem ? tel : currentStrParam;

          return (
            <IconButton
              key={id}
              icon={iconName}
              onPress={() => onPress(currentParamPressHandler)}
              iconColor={
                isphoneItem ? theme.onSurfaceVariant : theme.colors.primary
              }
            />
          );
        })}
      </View>
    </View>
  );
};

export default FoodServiceItem;
