import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    foodWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 20,
      paddingLeft: 20,
    },
    service: {
      maxWidth: 140,
      color: theme.colors.secondary,
      fontFamily: theme.fonts.lobsterFontFamily,
    },
    iconsBox: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingRight: 10,
    },
  });

export default styles;
