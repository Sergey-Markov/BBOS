import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import getFirstLettersFromNameString from '../../../utils/getFirstLettersFromNameString';

import s from './TelephoneDirectoryCard.styles';

type TOptionsCard = {
  photo: null;
  name: string;
  official_position: string;
  tel: string[];
};

interface ITelephoneDirectoryCardProps {
  options: TOptionsCard;
}

const TelephoneDirectoryCard = ({ options }: ITelephoneDirectoryCardProps) => {
  const { name, photo, official_position, tel } = options;
  const theme = useAppTheme();

  const lettersOfName = useMemo(
    () => getFirstLettersFromNameString(name),
    [name]
  );

  return (
    <View style={s(theme).container}>
      {photo ? (
        <Image
          source={{
            uri: photo,
          }}
          style={s(theme).img}
        />
      ) : (
        <View style={s(theme).preImg}>
          <Text>{lettersOfName}</Text>
        </View>
      )}
      <View style={s(theme).textWrapper}>
        <Text style={s(theme).name}>{name}</Text>
        <Text style={s(theme).position}>{official_position}</Text>
      </View>
      <IconButton
        icon="phone"
        iconColor={theme.colors.primary}
        onPress={() => callPhoneHandler(tel)}
      />
    </View>
  );
};

export default TelephoneDirectoryCard;
