import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.roundness,
    },
    secondaryBgc: {
      backgroundColor: theme.colors.secondary,
    },
    labelUppercase: {
      textTransform: 'uppercase',
    },
    outlinedBtn: {
      color: theme.colors.primary,
    },
    containedBtn: {
      color: theme.colors.background,
    },
  });

export default styles;
