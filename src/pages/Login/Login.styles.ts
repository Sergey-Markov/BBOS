import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    scroll: {
      gap: 5,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 10,

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
    rememberBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    formCheckbox: {
      left: -20,
      alignSelf: 'flex-start',
    },
    buttonContent: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.roundness,
    },
    btnsGroupe: {
      gap: 5,
    },
    secondaryBtn: {
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.roundness,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    registrationLinkBox: {
      alignSelf: 'center',
    },
  });

export default styles;
