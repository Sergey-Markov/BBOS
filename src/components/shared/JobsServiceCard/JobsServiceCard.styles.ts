import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: 85,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      borderRadius: 6,
      padding: 5,
    },
    label: {
      textAlign: 'center',
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.primary,
      fontFamily: theme.fonts.lobsterFontFamily,
    },
  });

export default styles;
