import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    newsContainer: {
      padding: 10,
    },
    img: {
      width: '100%',
      height: 250,
      borderRadius: 10,
    },
    title: {
      fontSize: 18,
      marginTop: 10,
      fontWeight: '600',
    },
    newsDescription: {
      fontSize: 16,
      marginTop: 10,
    },
    date: {
      fontSize: 14,
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.disabled,
      opacity: 0.3,
    },
  });

export default styles;
