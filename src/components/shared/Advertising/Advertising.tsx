import React from 'react';
import { Image, Pressable, View } from 'react-native';
import * as Linking from 'expo-linking';

import s from './Advertising.styles';

const advertisingImgPath = '../../../images/reklama-squooshed.jpeg';

const Advertising = () => {
  return (
    <View>
      <Pressable onPress={() => Linking.openURL('https://google.com')}>
        <Image
          style={s.img}
          resizeMode={'cover'}
          source={require(advertisingImgPath)}
          alt="Advertising Banner link"
        />
      </Pressable>
    </View>
  );
};

export default Advertising;
