import { Platform, StyleSheet, StatusBar } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});
