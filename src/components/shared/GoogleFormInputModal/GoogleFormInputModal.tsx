import React, { useCallback, useState } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IconButton, Snackbar, Text, TextInput } from 'react-native-paper';
import {
  ADDED_TEXT,
  GOOGLEFORM_INPUT_LABEL,
  GOOGLE_FORM_LINK,
  PASTE_LINK_TEXT,
  SNACKBAR_ACTION_LABEL,
  TIPS_TEXT,
} from '../../../constants';
import { useAppTheme } from '../../../hooks/useAppTheme';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

import s from './GoogleFormInputModal.styles';

const GoogleFormInputModal = ({
  onReset,
  value,
  onChange,
  isModalVisible,
  onModalToggler,
}: any) => {
  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState<boolean>(false);
  const theme = useAppTheme();

  const snackbarToggler = useCallback(() => {
    setIsVisibleSnackbar((prev) => !prev);
  }, []);

  const cancelHandler = useCallback(() => {
    onReset();
    onModalToggler();
  }, []);

  const openGoogleForm = useCallback(async () => {
    const supported = await Linking.canOpenURL(GOOGLE_FORM_LINK);
    if (supported) {
      Linking.openURL(GOOGLE_FORM_LINK);
    }
  }, []);

  return (
    <>
      <View style={s(theme).container}>
        {!value ? (
          <>
            <View style={s(theme).pasteContainer}>
              <IconButton
                icon="map-marker-question"
                size={20}
                iconColor={theme.colors.primary}
                onPress={snackbarToggler}
              />
              <Pressable onPress={onModalToggler}>
                <Text style={s(theme).text}>{PASTE_LINK_TEXT}</Text>
              </Pressable>
            </View>
            <IconButton
              icon="link-variant-plus"
              size={30}
              iconColor={theme.colors.primary}
              onPress={onModalToggler}
            />
          </>
        ) : (
          <>
            <Text style={s(theme).textSuccess}>{ADDED_TEXT}</Text>
            <View style={s(theme).successfullBtnsContainer}>
              <IconButton
                icon="link-variant"
                size={30}
                iconColor={theme.colors.primary}
                onPress={onModalToggler}
              />
              <IconButton
                icon="link-variant-remove"
                size={30}
                iconColor={theme.colors.error}
                onPress={onReset}
              />
            </View>
          </>
        )}
        <Snackbar
          elevation={3}
          style={s(theme).snackbar}
          visible={isVisibleSnackbar}
          onDismiss={snackbarToggler}
          icon="close"
          onIconPress={snackbarToggler}
          action={{
            label: SNACKBAR_ACTION_LABEL,
            labelStyle: s(theme).snackbarLabelOpen,
            onPress: openGoogleForm,
          }}
        >
          <Text>{TIPS_TEXT}</Text>
        </Snackbar>
      </View>
      <ModalWrapper isVisible={isModalVisible} onClose={onModalToggler}>
        <KeyboardAwareScrollView
          contentContainerStyle={s(theme).modalContainerForKeyboard}
          keyboardShouldPersistTaps="handled"
          extraHeight={120}
        >
          <TextInput
            mode="outlined"
            label={GOOGLEFORM_INPUT_LABEL}
            right={<TextInput.Icon icon="close" size={20} onPress={onReset} />}
            value={value}
            onChangeText={onChange}
            textBreakStrategy="balanced"
            multiline
          />
          <View style={s(theme).modalBtnsContainer}>
            <IconButton
              icon="content-save-check"
              size={50}
              iconColor={theme.colors.primary}
              onPress={onModalToggler}
            />
            <IconButton
              icon="content-save-off"
              size={50}
              iconColor={theme.colors.error}
              onPress={cancelHandler}
            />
          </View>
        </KeyboardAwareScrollView>
      </ModalWrapper>
    </>
  );
};

export default GoogleFormInputModal;
