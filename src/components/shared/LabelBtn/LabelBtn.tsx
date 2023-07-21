import React from 'react';
import { Button } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';

import s from './LabelBtn.styles';

const LabelBtn = ({
  label,
  mode = 'text',
  bordered,
  secondary,
  onPress,
  icon,
  children,
}: any) => {
  const theme = useAppTheme();

  return (
    <Button
      mode={mode}
      style={[
        bordered && s(theme).container,
        secondary && s(theme).secondaryBgc,
      ]}
      labelStyle={[
        bordered && s(theme).labelUppercase,
        mode === 'contained' && s(theme).containedBtn,
        mode === 'outlined' && s(theme).outlinedBtn,
      ]}
      onPress={onPress}
      icon={icon}
    >
      {children ? children : label}
    </Button>
  );
};

export default LabelBtn;
