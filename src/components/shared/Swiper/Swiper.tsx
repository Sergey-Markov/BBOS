import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ISwiperProps } from '../../../interfaces';

import s from './Swiper.styles';

const Swiper = ({
  mode = 'horizontal-stack',
  snapDirection = 'left',
  pagingEnabled = true,
  snapEnabled = true,
  dataOptions,
  children,
}: ISwiperProps) => {
  const { width } = Dimensions.get('window');
  const currentBoxWidth = width - 20;

  return (
    <View style={s.container}>
      <Carousel
        width={currentBoxWidth}
        height={290}
        autoPlay={true}
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        mode={mode}
        modeConfig={{
          snapDirection,
          stackInterval: mode === 'vertical-stack' ? 18 : 0,
        }}
        data={dataOptions}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => <View style={s.page}>{children(item)}</View>}
      />
    </View>
  );
};

export default Swiper;
