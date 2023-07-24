import React from 'react';
import { Button, Text } from 'react-native-paper';
import { PREV_BTN_LABEL } from '../../../constants';
import { useAppTheme } from '../../../hooks/useAppTheme';

import s from './WebCtrlBtn.styles';

interface IWebCtrlBtn {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onBackPress?: () => void;
  onForwardPress?: () => void;
}

const WebCtrlBtn = ({
  canGoBack,
  canGoForward,
  onBackPress,
  onForwardPress,
}: IWebCtrlBtn) => {
  const theme = useAppTheme();

  const btnTextColorsForward = canGoForward
    ? theme.colors.whiteText
    : undefined;
  const btnTextColorsBack = canGoBack ? theme.colors.whiteText : undefined;

  const currentTextColor = onBackPress
    ? btnTextColorsBack
    : btnTextColorsForward;

  const backgroundColorBtnBack = !canGoBack
    ? theme.elevation.level5
    : theme.colors.secondary;
  const backgroundColorBtnForward = !canGoForward
    ? theme.elevation.level5
    : theme.colors.secondary;

  return (
    <Button
      style={[
        onBackPress && {
          ...s(theme).ctrlBtnLeft,
          backgroundColor: backgroundColorBtnBack,
        },
        onForwardPress && {
          ...s(theme).ctrlBtnRight,
          backgroundColor: backgroundColorBtnForward,
        },
      ]}
      contentStyle={
        onBackPress ? s(theme).ctrlLeftBtnContent : s(theme).ctrlRightBtnContent
      }
      disabled={onBackPress ? !canGoBack : !canGoForward}
      icon={onBackPress ? 'arrow-u-left-top' : 'arrow-u-right-top'}
      mode="text"
      onPress={!!onBackPress ? onBackPress : onForwardPress}
      textColor={currentTextColor}
    >
      <Text variant="labelSmall">{PREV_BTN_LABEL}</Text>
    </Button>
  );
};

export default WebCtrlBtn;
