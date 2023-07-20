import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    event: {
      backgroundColor: theme.secondaryContainer,
      marginVertical: 5,
    },
    cardCover: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    cardContent: {
      paddingVertical: 5,
    },
    aboutBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
    },
    eventIconBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    btnShareLabel: {
      color: theme.colors.primary,
      ...theme.fonts.labelMedium,
    },
    btnLabel: {
      color: theme.colors.background,
      ...theme.fonts.labelMedium,
    },
  });

export default styles;
