import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'react-native-paper';
import EventForm from '../../components/shared/EventForm/EventForm';
import GoBackBtn from '../../components/shared/GoBackBtn/GoBackBtn';
import NewsForm from '../../components/shared/NewsForm/NewsForm';
import PostForm from '../../components/shared/PostForm/PostForm';
import { IScreenProps } from '../../interfaces';

const Forms = ({ navigation, route }: IScreenProps<'Forms'>) => {
  if (!route.params) {
    return null;
  }
  const { formTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: formTitle,
    });
  }, []);

  switch (formTitle) {
    case 'Add Event':
      return (
        <KeyboardAwareScrollView extraHeight={120}>
          <EventForm />
        </KeyboardAwareScrollView>
      );
    case 'Add News':
      return (
        <KeyboardAwareScrollView extraHeight={120}>
          <NewsForm />
        </KeyboardAwareScrollView>
      );
    case 'Add Post':
      return (
        <KeyboardAwareScrollView extraHeight={120}>
          <PostForm />
        </KeyboardAwareScrollView>
      );

    default:
      break;
  }
};

export default Forms;
