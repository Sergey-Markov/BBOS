import { Alert, Linking } from 'react-native';

const doCall = async (phone: string) => {
  const canDoCall = await Linking.canOpenURL(`tel:${phone}`);
  if (canDoCall) {
    await Linking.openURL(`tel:${phone}`);
  } else {
    Alert.alert(`Don't know how to make a call: ${phone}`);
  }
};

export default doCall;
