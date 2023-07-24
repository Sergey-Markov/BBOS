import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ctrlBtnLeft: {
    borderRightWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  ctrlBtnRight: {
    borderRightWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  ctrlLeftBtnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  ctrlRightBtnContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default styles;
