import React, { useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EventForm from '../../components/shared/EventForm/EventForm';
import NewsForm from '../../components/shared/NewsForm/NewsForm';
import PostForm from '../../components/shared/PostForm/PostForm';
import { IScreenProps } from '../../interfaces';

const Forms = ({ navigation, route }: IScreenProps<'Forms'>) => {
  if (!route.params) {
    return null;
  }
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const { formTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: formTitle,
    });
  }, []);

  switch (formTitle) {
    case 'Add Event':
      return (
        <KeyboardAwareScrollView extraHeight={120} ref={scrollRef}>
          <EventForm scrollRef={scrollRef} />
        </KeyboardAwareScrollView>
      );
    case 'Add News':
      return (
        <KeyboardAwareScrollView extraHeight={120} ref={scrollRef}>
          <NewsForm scrollRef={scrollRef} />
        </KeyboardAwareScrollView>
      );
    case 'Add Post':
      return (
        <KeyboardAwareScrollView extraHeight={120} ref={scrollRef}>
          <PostForm scrollRef={scrollRef} />
        </KeyboardAwareScrollView>
      );

    default:
      break;
  }
};

export default Forms;
