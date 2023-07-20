import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    img: { minWidth: 300, height: 200 },
    icon: {
      position: 'absolute',
      top: -20,
      right: -20,
      backgroundColor: theme.colors.background,
    },
  });

export default styles;
