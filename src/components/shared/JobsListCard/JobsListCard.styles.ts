import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      borderRadius: 6,
      padding: 10,
      margin: 10,
    },
    name: {
      width: 100,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
      fontFamily: theme.fonts.lobsterFontFamily,
    },
    tel: {
      fontSize: 9,
      fontWeight: 'bold',
      color: theme.colors.primary,
      fontFamily: theme.fonts.robotoFontFamily,
    },
    description: {
      width: '50%',
      fontSize: 9,
      fontWeight: 'bold',
      color: theme.onSurfaceVariant,
      fontFamily: theme.fonts.robotoFontFamily,
    },
  });

export default styles;
