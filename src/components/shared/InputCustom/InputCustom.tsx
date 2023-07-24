import React from 'react';
import { TextInput } from 'react-native-paper';

import s from './InputCustom.styles';

const InputCustom = ({
  label,
  value,
  onReset,
  onChange,
  onBlur,
  multiline = false,
}: any) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      right={<TextInput.Icon icon="close" size={20} onPress={onReset} />}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      textBreakStrategy="balanced"
      multiline={multiline}
    />
  );
};

export default InputCustom;
