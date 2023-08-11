import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IScreenProps } from '../../interfaces';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { onSnapshot } from 'firebase/firestore';
import {
  addDataToFirebase,
  auth,
  getChatsDataFromFirestore,
} from '../../../firebase';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

const Chat = ({ navigation, route }: IScreenProps<'Chat'>) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    const querySnapshot = async () => {
      const result = await getChatsDataFromFirestore();
      onSnapshot(result, (snapshot) => {
        setMessages(
          snapshot.docs.map((item) => ({
            _id: item.data()._id,
            text: item.data().text,
            createdAt: item.data().createdAt.toDate(),
            user: item.data().user,
          }))
        );
      });
    };

    querySnapshot();
  }, []);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    setMessages((previousMessages: IMessage[]) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, text, createdAt, user } = messages[0];
    await addDataToFirebase('chats', { _id, text, createdAt, user });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        showAvatarForEveryMessage
        messages={messages}
        onSend={(messages: IMessage[]) => onSend(messages)}
        user={{
          _id: auth.currentUser?.email as string,
          name: auth.currentUser?.displayName as string,
          avatar: auth.currentUser?.photoURL as string,
        }}
        renderUsernameOnMessage
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default Chat;
