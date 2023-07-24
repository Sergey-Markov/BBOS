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

const BTNS_ARR = [
  {
    id: '1',
    iconName: 'phone',
    onPress: (tel: string[] | string) => callPhoneHandler(tel as string[]),
  },
  {
    id: '2',
    iconName: 'google-maps',
    onPress: (address: string | string[]) =>
      openGoogleMapHandler(address as string),
    iconColor: true,
  },
];

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
        {BTNS_ARR.map(({ id, iconName, onPress }) => {
          const isphoneItem = iconName === 'phone';
          const currentParamPressHandler = isphoneItem ? tel : address;
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

export default CommonServicesItem;
