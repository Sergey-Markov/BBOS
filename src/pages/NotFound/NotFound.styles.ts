import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  notFound: {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: [{ translateX: 70 }, { translateY: -40 }],
  },
  container: {
    alignItems: 'center',
  },
});

export default styles;
