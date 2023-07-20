import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { IScreenProps } from '../../interfaces';

import s from './Details.styles';

const Details = ({ navigation, route }: IScreenProps<'Details'>) => {
  const handlePress = () => {
    navigation.navigate('Home', { title: 'Hey from Details' });
  };

  return (
    <View style={s.container}>
      <Text>Details Screen</Text>
      <Pressable onPress={handlePress}>
        <Text>Go to Home</Text>
      </Pressable>
    </View>
  );
};

export default Details;
