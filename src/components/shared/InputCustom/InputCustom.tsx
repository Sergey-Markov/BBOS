import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import { scrollToComponentHandler } from '../../../utils/scrollToComponentHandler';

interface IInputCustom {
  scrollRef?: React.RefObject<KeyboardAwareScrollView>;
  label: string;
  value: string;
  onReset: () => void;
  onChange: () => void;
  onBlur: () => void;
  multiline: boolean;
}
const InputCustom = ({
  scrollRef,
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
      onContentSizeChange={(e) => {
        if (scrollRef && e.nativeEvent.contentSize.height > 50) {
          if (e.currentTarget) {
            scrollToComponentHandler(e.currentTarget, scrollRef);
          }
        }
      }}
    />
  );
};

export default InputCustom;
