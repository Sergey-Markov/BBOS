import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, Pressable, View, Share } from 'react-native';
import { Text } from 'react-native-paper';
import LabelBtn from '../LabelBtn/LabelBtn';
import WebCtrlBtn from '../WebCtrlBtn/WebCtrlBtn';
import WebView from 'react-native-webview';
import { useAppTheme } from '../../../hooks/useAppTheme';
import NotFound from '../../../pages/NotFound/NotFound';
import Spiner from '../Spiner/Spiner';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { SHARE_BTN_LABEL } from '../../../constants';

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

  const handleBackButton = useCallback(() => {
    if (canGoBack) {
      if (webviewRef.current) {
        webviewRef.current.goBack();
      } else {
        navigation.goBack();
      }
    }
    return true;
  }, [canGoBack]);

  const handleForwardButton = useCallback(() => {
    if (canGoForward && webviewRef.current) {
      webviewRef.current.goForward();
    }
  }, [canGoForward]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const shareContent = useCallback(async () => {
    try {
      Share.share({
        url: currentUrl,
        message: currentUrl,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [canGoBack]);

  return (
    <View style={s(theme).container}>
      <View style={s(theme).containerCtrlBtns}>
        <WebCtrlBtn canGoBack={canGoBack} onBackPress={handleBackButton} />
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
        <WebCtrlBtn
          canGoForward={canGoForward}
          onForwardPress={handleForwardButton}
        />
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
        <View style={s(theme).qrCodeWrapper}>
          <QRCode
            content={currentUrl}
            logo={require('../../../../assets/favicon.png')}
            logoSize={50}
            size={250}
            color={theme.colors.primary}
            ecl="M"
          />
          <Text style={s(theme).qrCodeLink} selectable>
            {currentUrl}
          </Text>
          <View style={s(theme).shareBtnWrapper}>
            <LabelBtn
              mode="contained"
              label={SHARE_BTN_LABEL}
              onPress={shareContent}
            />
          </View>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default WebViewWithCtrls;
