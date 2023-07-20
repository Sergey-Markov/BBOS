import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import useService from '../../../hooks/useService';
import Spiner from '../Spiner/Spiner';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { WEATHER_INITIAL_IMG_URL } from '../../../constants';

import styles from './Weather.styles';

const Weather = () => {
  const theme = useAppTheme();
  const { weatherData } = useService();

  if (!weatherData) {
    return <Spiner color={theme.colors.primary} size={20} />;
  }

  const { icon, temp, city, wind } = weatherData;
  const iconInitialUrl = `${WEATHER_INITIAL_IMG_URL}${icon}.png`;
  const windStr = `💨${wind}`;
  return (
    <View>
      {weatherData ? (
        <ImageBackground
          source={{
            uri: iconInitialUrl,
          }}
          style={styles(theme).weather}
          resizeMode="contain"
        >
          <View style={styles(theme).weather__topWrapper}>
            <Text style={styles(theme).text__temp}>{temp}</Text>
            <Text style={styles(theme).text__location}>{city}</Text>
          </View>
          <View style={styles(theme).weather__bottomWrapper}>
            <Text style={styles(theme).text__wind}>{windStr}</Text>
          </View>
        </ImageBackground>
      ) : (
        <Spiner color={theme.colors.primary} size={20} />
      )}
    </View>
  );
};

export default Weather;
