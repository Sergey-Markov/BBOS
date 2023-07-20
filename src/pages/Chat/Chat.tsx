import React from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import EventForm from '../../components/shared/EventForm/EventForm';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IScreenProps } from '../../interfaces';

import s from './Chat.styles';

const Chat = ({ navigation, route }: IScreenProps<'Chat'>) => {
  const theme = useAppTheme();
  return (
    <ScrollView
    // onScroll={Keyboard.dismiss}
    // scrollEventThrottle={16}
    // style={{ height: '100%' }}
    // style={s.container}
    >
      <EventForm />
    </ScrollView>
  );
};

export default Chat;
