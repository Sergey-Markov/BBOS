import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pasteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      left: -15,
    },
    text: {
      fontSize: 18,
      fontFamily: theme.fonts.robotoFontFamily,
      fontWeight: '500',
    },
    textSuccess: {
      fontSize: 18,
      fontFamily: theme.fonts.lobsterFontFamily,
      fontWeight: '600',
      color: theme.colors.successfull,
    },
    successfullBtnsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    snackbar: {
      flexDirection: 'column',
      backgroundColor: theme.primaryContainer,
    },
    snackbarLabelOpen: {
      fontSize: 18,
      fontFamily: theme.fonts.robotoBold,
    },
    modalContainerForKeyboard: {
      paddingBottom: 100,
      paddingHorizontal: 10,
    },
    modalBtnsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
  });

export default styles;
