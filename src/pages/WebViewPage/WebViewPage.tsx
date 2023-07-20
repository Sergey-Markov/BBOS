import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IScreenProps } from '../../interfaces';
import WebViewWithCtrls from '../../components/shared/WebViewWithCtrls/WebViewWithCtrls';

const WebViewPage = ({ navigation, route }: IScreenProps<'WebViewPage'>) => {
  const theme = useAppTheme();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: route.params?.screen,
      });
      return;
    }, [])
  );

  return (
    <>
      <WebViewWithCtrls url={route.params?.url || ''} />
    </>
  );
};

export default WebViewPage;
