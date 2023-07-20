import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../hooks/useAppTheme';

import s from './ModalWrapper.styles';

interface IModalWrapperProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const ModalWrapper = ({ children, isVisible, onClose }: IModalWrapperProps) => {
  const theme = useAppTheme();

  return (
    <View>
      <Modal
        style={s(theme).modal}
        swipeDirection="down"
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
      >
        <View style={s(theme).container}>
          <View style={s(theme).childrenWrapper} />
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default ModalWrapper;
