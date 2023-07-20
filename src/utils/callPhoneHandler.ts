import { Alert, AlertButton } from 'react-native';
import doCall from './doCall';

const callPhoneHandler = (tel: string[]) => {
  if (tel.length > 1) {
    const phoneList: AlertButton[] = tel.map((phone, index) => ({
      text: phone,
      onPress: () => doCall(phone),
      style: 'default',
    }));
    Alert.alert('Choose phone number', '', [
      ...phoneList,
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  } else {
    doCall(tel[0]);
  }
};

export default callPhoneHandler;
