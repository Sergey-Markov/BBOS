import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 20,
    },
    img: {
      width: '100%',
      height: 350,
      borderBottomLeftRadius: theme.bordered,
      borderBottomRightRadius: theme.bordered,
    },
    textBox: {
      gap: 10,
      paddingHorizontal: 10,
    },
    userName: {
      color: theme.colors.primary,
      fontSize: 20,
      fontFamily: theme.fonts.lobsterFontFamily,
    },
    otherDataText: {
      color: theme.colors.disabled,
      fontSize: 12,
      fontFamily: theme.fonts.robotoFontFamily,
      lineHeight: 0,
    },
  });

export default styles;
