import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    weather: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 105,
      height: 45,
      borderRadius: 4,
      paddingHorizontal: 2,
      paddingVertical: 5,
      backgroundColor: 'transparent',
    },
    weather__topWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
    },
    text__location: {
      fontSize: 8,
      lineHeight: 8,
      color: theme.colors.whiteText,
      fontFamily: theme.fonts.robotoBold,
    },
    text__locationDate: {
      width: '46%',
      fontSize: 5,
      fontWeight: 'bold',
      color: theme.colors.whiteText,
    },
    weather__bottomWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    text__temp: {
      fontSize: 12,
      lineHeight: 20,
      color: theme.onSurfaceVariant,
      fontFamily: theme.fonts.robotoBold,
    },
    text__wind: {
      fontSize: 8,
      color: theme.colors.whiteText,
      fontFamily: theme.fonts.robotoBold,
    },
  });

export default styles;
