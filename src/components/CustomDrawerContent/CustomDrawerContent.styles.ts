import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      marginLeft: 10,
    },
    img: { width: 50, height: 50, borderRadius: 50 },
    userName: {
      color: theme.colors.primary,
      fontSize: 20,
      fontFamily: theme.fonts.lobsterFontFamily,
    },
    userPhone: {
      color: theme.colors.secondary,
      fontSize: 12,
      fontFamily: theme.fonts.lobsterFontFamily,
      lineHeight: 0,
    },
    drawerItemContainer: {
      marginTop: 10,
    },
  });

export default styles;
