import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const styles = (theme: any) =>
  StyleSheet.create({
    modal: { margin: 0 },
    container: {
      height: height,
      backgroundColor: theme.colors.tertiaryContainer,
      marginTop: '60%',
      paddingVertical: 15,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.onSurfaceVariant,
    },
    childrenWrapper: {
      alignSelf: 'center',
      width: 90,
      height: 5,
      borderRadius: 5,
      backgroundColor: theme.inverseSurface,
      marginBottom: 30,
    },
  });

export default styles;
