import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      width: 56,
      backgroundColor: theme.secondaryContainer,
      position: 'absolute',
      bottom: 90,
      right: 15,
      alignSelf: 'center',
      borderRadius: 16,
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 6,
    },
  });

export default styles;
