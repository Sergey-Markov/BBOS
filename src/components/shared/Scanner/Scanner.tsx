import React, { useEffect, useRef, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, IconButton, Snackbar } from 'react-native-paper';
import { AppState, AppStateStatus, Linking, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppTheme } from '../../../hooks/useAppTheme';

import s from './Scanner.styles';
import {
  CAMERA_PERMISSION_STR,
  NO_CAMERA_PERMISSION_STR,
  SNACKBAR_ACTION_LABEL,
} from '../../../constants';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState<AppStateStatus>(
    appState.current
  );
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const [widthScanner, setWidthScanner] = useState(0);
  const [heightScanner, setHeightScanner] = useState(0);
  const [xBoundScanner, setXBoundScanner] = useState(0);
  const [yBoundScanner, setYBoundScanner] = useState(0);
  const theme = useAppTheme();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (context: any) => {
    setScanned(true);
    setScannedData(context.data);
    setHeightScanner(context.bounds.size.height);
    setWidthScanner(context.bounds.size.width);
    setXBoundScanner(context.bounds.origin.x);
    setYBoundScanner(context.bounds.origin.y);
  };

  if (hasPermission === null) {
    return <Text>{CAMERA_PERMISSION_STR}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{NO_CAMERA_PERMISSION_STR}</Text>;
  }

  const isActiveAppState = appStateVisible === 'active';
  return (
    <View style={s(theme).container}>
      {isActiveAppState && (
        <BarCodeScanner
          type="back"
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={s(theme).barCodeScanner}
        >
          {scanned && (
            <View
              style={{
                ...s(theme).svgWapper,
                top: yBoundScanner,
                left: xBoundScanner,
                width: widthScanner + 25,
                height: heightScanner + 25,
              }}
            >
              <Ionicons
                adjustsFontSizeToFit
                name="scan-outline"
                size={widthScanner + 25}
                color={theme.colors.primary}
              />
            </View>
          )}
          <Snackbar
            elevation={3}
            style={s(theme).snackbar}
            visible={scanned}
            onDismiss={() => setScanned(false)}
            action={{
              label: SNACKBAR_ACTION_LABEL,
              onPress: () => {
                if (scannedData) {
                  Linking.openURL(scannedData);
                }
              },
            }}
          >
            {scannedData}
          </Snackbar>
          <IconButton
            icon="camera"
            mode="contained"
            style={s(theme).buttonContainer}
            size={60}
            onPress={() => setScanned(false)}
          />
        </BarCodeScanner>
      )}
    </View>
  );
};

export default Scanner;
