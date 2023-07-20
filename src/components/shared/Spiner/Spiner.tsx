import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { ISpinerProps } from '../../../interfaces';
import lightTheme from '../../../themes/lightTheme';

import s from './Spiner.styles';

const theme = lightTheme;

const Spiner = memo(
  ({ color = theme.colors.secondary, size = 50 }: ISpinerProps) => {
    return (
      <ActivityIndicator
        animating={true}
        color={color}
        size={size}
        style={s.spiner}
      />
    );
  }
);

export default Spiner;
