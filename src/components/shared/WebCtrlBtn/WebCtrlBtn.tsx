import React from 'react';

import s from './WebCtrlBtn.styles';

const WebCtrlBtn = () => {
  return (
    <Button
      style={{
        ...s(theme).ctrlBtnLeft,
        backgroundColor: backgroundColorBtnBack,
      }}
      contentStyle={s(theme).ctrlBtnContent}
      disabled={!canGoBack}
      icon="arrow-u-left-top"
      mode="text"
      onPress={handleBackButton}
      textColor={btnTextColorsBack}
    >
      <Text variant="labelSmall">{PREV_BTN_LABEL}</Text>
    </Button>
  );
};

export default WebCtrlBtn;
