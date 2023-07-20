import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    img: { width: 50, height: 50, borderRadius: 50 },
    preImg: {
      width: 50,
      height: 50,
      backgroundColor: theme.secondaryContainer,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textWrapper: {
      alignItems: 'center',
    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: theme.fonts.robotoFontFamily,
    },
    position: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.onSurfaceVariant,
      fontFamily: theme.fonts.robotoFontFamily,
    },
  });

export default styles;
