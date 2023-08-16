import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import goToUrl from '../../../utils/goToUrl';

import s from './TaxiServiceItem.styles';
import { TTaxiItem } from '../../../pages/Servicing/Servicing';

interface ITaxiServiceItemProps {
  item: TTaxiItem;
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
];

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
        {BTNS_ARR.map(({ id, onPress, iconName }) => {
          const isphoneItem = iconName === 'phone';
          const currentIconColor = isphoneItem
            ? theme.onSurface
            : theme.colors.primary;
          const currentParamPressHandler = isphoneItem ? tel : url;

          return (
            <IconButton
              key={id}
              icon={iconName}
              onPress={() => onPress(currentParamPressHandler)}
              iconColor={currentIconColor}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TaxiServiceItem;
