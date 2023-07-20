import { Platform, StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  viewPager: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
