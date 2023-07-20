import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    barCodeScanner: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    svgWapper: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: '10%',
      right: '50%',
      transform: [{ translateX: 45 }],
      backgroundColor: theme.onSurface,
      opacity: 0.8,
    },
    snackbar: {
      backgroundColor: theme.primaryContainer,
    },
    icon: {
      fontWeight: '100',
    },
  });

export default styles;
