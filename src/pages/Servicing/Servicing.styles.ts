import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    commercialWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginBottom: 15,
      padding: 10,
      gap: 10,
    },
  });

export default styles;
