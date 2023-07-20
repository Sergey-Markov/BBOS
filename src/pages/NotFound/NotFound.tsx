import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import s from './NotFound.styles';

const NotFound = () => {
  return (
    <View style={s.notFound}>
      <View style={s.container}>
        <Text variant="bodyLarge">NotFound</Text>
        <Text variant="bodySmall">Tell us about the error</Text>
      </View>
    </View>
  );
};

export default NotFound;
