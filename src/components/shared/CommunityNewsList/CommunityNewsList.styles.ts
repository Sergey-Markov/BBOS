import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: 10,
      gap: 10,
    },
    img: {
      width: '30%',
      height: 100,
      borderRadius: 15,
    },
    content: {
      justifyContent: 'space-between',
      width: '65%',
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.disabled,
    },
  });

export default styles;
