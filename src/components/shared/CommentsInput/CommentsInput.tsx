import React, { RefAttributes } from 'react';
import { Keyboard, View, TextInput as typeTextInput } from 'react-native';
import { TextInput, IconButton, TextInputProps } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppTheme } from '../../../hooks/useAppTheme';
import {
  COMMENTS_INPUT_LABEL,
  COMMENTS_INPUT_PLACEHOLDER,
  COMMENTS_INPUT_RETUN_KEY_LABEL,
} from '../../../constants';

import s from './CommentsInput.styles';

interface ICommentsInputProps {
  value: string;
  onChange: (text: string) => void;
  scrollRef: React.RefObject<KeyboardAwareScrollView>;
  inputRef: React.RefObject<typeTextInput & RefAttributes<TextInputProps>>;
  onSubmit: () => void;
}

const CommentsInput = ({
  value,
  onChange,
  scrollRef,
  inputRef,
  onSubmit,
}: ICommentsInputProps) => {
  const theme = useAppTheme();

  const handleScrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd(true);
    }
  };
  const handleBlur = () => {
    onChange('');
  };

  const isValue = value.length > 0;
  const sendBtnHandler = () => {
    if (isValue) {
      onSubmit();
      onChange('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={s.inputWrapper}>
      <TextInput
        ref={inputRef}
        mode="outlined"
        keyboardType="default"
        returnKeyLabel={COMMENTS_INPUT_RETUN_KEY_LABEL}
        label={COMMENTS_INPUT_LABEL}
        placeholder={COMMENTS_INPUT_PLACEHOLDER}
        value={value}
        onFocus={handleScrollToEnd}
        onChangeText={onChange}
        onSubmitEditing={(e) => {
          alert(e);
        }}
        onBlur={handleBlur}
        style={s.textInput}
        maxLength={400}
        multiline={true}
        onContentSizeChange={(e) => {
          if (e.nativeEvent.contentSize.height > 50) {
            handleScrollToEnd();
          }
        }}
      />
      <IconButton
        icon={isValue ? 'send' : 'pencil'}
        iconColor={isValue ? theme.colors.primary : theme.colors.disabled}
        style={s.sendIcon}
        onPress={sendBtnHandler}
      />
    </View>
  );
};

export default CommentsInput;
