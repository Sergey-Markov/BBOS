import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.disabled,
      opacity: 0.3,
    },
  });

export default styles;
