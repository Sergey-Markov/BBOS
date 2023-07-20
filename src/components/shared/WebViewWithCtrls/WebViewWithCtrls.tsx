import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, Pressable, View, Share } from 'react-native';
import { Button, Text } from 'react-native-paper';
import WebView from 'react-native-webview';
import { useAppTheme } from '../../../hooks/useAppTheme';
import NotFound from '../../../pages/NotFound/NotFound';
import Spiner from '../Spiner/Spiner';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

import s from './WebViewWithCtrls.styles';

interface IWebViewWithCtrlsProps {
  url: string;
}
const OnLoading = () => (
  <View style={{ alignSelf: 'center' }}>
    <Spiner />
  </View>
);

const WebViewWithCtrls = ({ url }: IWebViewWithCtrlsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const webviewRef = useRef<WebView>(null);
  const navigation = useNavigation();
  const theme = useAppTheme();

  const handleBackButton = () => {
    if (canGoBack) {
      if (webviewRef.current) {
        webviewRef.current.goBack();
      } else {
        navigation.goBack();
      }
    }
    return true;
  };

  const handleForwardButton = () => {
    if (canGoForward && webviewRef.current) {
      webviewRef.current.goForward();
    }
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const shareContent = async () => {
    try {
      Share.share({
        url: currentUrl,
        message: currentUrl,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [canGoBack]);

  const btnTextColorsForward = canGoForward ? 'white' : undefined;
  const btnTextColorsBack = canGoBack ? 'white' : undefined;
  const backgroundColorBtnBack = !canGoBack ? '#ccc' : theme.colors.secondary;
  const backgroundColorBtnForward = !canGoForward
    ? '#ccc'
    : theme.colors.secondary;

  return (
    <View style={s(theme).container}>
      <View style={s(theme).containerCtrlBtns}>
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
          <Text variant="labelSmall">prev</Text>
        </Button>
        <Pressable onPress={toggleModal}>
          <QRCode
            content={currentUrl}
            logo={require('../../../../assets/favicon.png')}
            logoSize={24}
            size={73}
            color={theme.colors.error}
            ecl="M"
          />
        </Pressable>
        <Button
          style={{
            ...s(theme).ctrlBtnRight,
            backgroundColor: backgroundColorBtnForward,
          }}
          disabled={!canGoForward}
          contentStyle={{
            ...s(theme).ctrlBtnContent,
            flexDirection: 'row-reverse',
          }}
          icon="arrow-u-right-top"
          mode="text"
          onPress={handleForwardButton}
          textColor={btnTextColorsForward}
        >
          <Text variant="labelSmall">prev</Text>
        </Button>
      </View>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        startInLoadingState={true}
        renderLoading={OnLoading}
        allowsInlineMediaPlayback={true}
        style={s(theme).webView}
        source={{
          uri: currentUrl,
        }}
        onNavigationStateChange={(navState) => {
          if (!navState.loading) {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
            setCurrentUrl(navState.url);
          }
        }}
        renderError={NotFound}
      />
      <ModalWrapper isVisible={modalOpen} onClose={toggleModal}>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <QRCode
            content={currentUrl}
            logo={require('../../../../assets/favicon.png')}
            logoSize={50}
            size={250}
            color={theme.colors.primary}
            ecl="M"
          />
          <Text
            style={{
              width: 250,
              textAlign: 'center',
              marginBottom: 10,
            }}
            selectable
          >
            {currentUrl}
          </Text>
          <Pressable onPress={shareContent}>
            <Text
              variant="titleLarge"
              style={{
                color: theme.colors.secondary,
                fontWeight: '600',
              }}
            >
              share
            </Text>
          </Pressable>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default WebViewWithCtrls;
