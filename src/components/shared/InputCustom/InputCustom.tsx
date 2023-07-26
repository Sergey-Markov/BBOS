import React from 'react';
import { TextInput } from 'react-native-paper';

interface IInputCustom {
  label: string;
  value: string;
  onReset: () => void;
  onChange: () => void;
  onBlur: () => void;
  multiline: boolean;
}
const InputCustom = ({
  label,
  value,
  onReset,
  onChange,
  onBlur,
  multiline = false,
}: IInputCustom) => {
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
