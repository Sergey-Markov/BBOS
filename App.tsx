import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import RootNavigation from './src/pages/RootNavigation';
import { theme } from './src/hooks/useAppTheme';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/src/types';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme as ThemeProp}>
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      </PaperProvider>
    </View>
  );
}
