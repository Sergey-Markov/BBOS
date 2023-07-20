import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      height: '100%',
      paddingHorizontal: 0,
      justifyContent: 'center',
    },
    containerCtrlBtns: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    ctrlBtnLeft: {
      borderRightWidth: 1,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    ctrlBtnRight: {
      borderRightWidth: 1,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    ctrlBtnContent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    webView: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    },
  });

export default styles;
