import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    scroll: {
      paddingHorizontal: 10,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 15,

      ...Platform.select({
        ios: { paddingTop: 20 },
        android: { paddingTop: StatusBar.currentHeight },
      }),
    },
    titleContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    titleText: {
      fontSize: 20,
      ...theme.fonts.titleLarge,
      color: theme.colors.primary,
    },
    titleTextSecondary: {
      fontSize: 20,
      ...theme.fonts.titleLarge,
      color: theme.colors.secondary,
    },
    formContainer: {
      width: '100%',
      gap: 10,
    },
    buttonContent: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.roundness,
    },
    registrationLinkBox: {
      alignSelf: 'center',
    },
    registrationLinkText: {
      alignSelf: 'flex-end',
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  });

export default styles;
