import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
      paddingHorizontal: 10,
      gap: 10,
    },
    img: {
      width: '100%',
      height: 200,
      borderRadius: 15,
    },
    titleContent: {
      gap: 5,
    },
    description: {
      marginVertical: 10,
    },
  });

export default styles;
