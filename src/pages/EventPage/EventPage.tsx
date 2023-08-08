import React, { useEffect, useRef } from 'react';
import { Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Event from '../../components/shared/Event/Event';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Comments from '../../components/shared/Comments/Comments';
import CommentsInput from '../../components/shared/CommentsInput/CommentsInput';
import { IScreenProps, TComment, TEventData } from '../../interfaces';
import { useAppTheme } from '../../hooks/useAppTheme';
import { getCurrentItemById } from '../../utils/getCurrentItemById';
import { useSelector } from 'react-redux';
import { eventsSelector } from '../../redux/reducers/eventsReducer';

import s from './EventPage.styles';

const EventPage = ({ navigation, route }: IScreenProps<'EventPage'>) => {
  const [text, setText] = React.useState('');
  const [selfComment, setSelfComment] = React.useState<TComment>({
    id: '0',
    parentId: '',
    userName: 'Serhiy',
    userId: '777',
    message: '',
    create_at: new Date().getTime(),
  });
  const theme = useAppTheme();
  const allEvents = useSelector(eventsSelector);

  const { id } = route.params;
  const eventData = getCurrentItemById(id, allEvents);
  type TCurrentEventData = typeof eventData;

  const [innerData, setInnerData] = React.useState<
    TCurrentEventData | TEventData
  >(eventData);

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const inputCommentRef = useRef<TextInput>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Pressable onPress={() => goBack()}>
          <Ionicons
            name="md-chevron-back-outline"
            color={tintColor}
            size={24}
          />
        </Pressable>
      ),
    });
  }, []);

  useEffect(() => {
    setInnerData(eventData);
  }, [id]);

  const handleSubmit = () => {
    const newComment = {
      ...selfComment,
      message: text,
      id: String((Math.random() * 1000).toFixed(0)),
    };

    setInnerData((prev) => {
      if (prev) {
        return {
          ...prev,
          comments: [...prev.comments, newComment],
        };
      }
    });

    setSelfComment((prev) => {
      return { ...prev, parentId: '', message: '' };
    });
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={s(theme).eventContainer}
      keyboardShouldPersistTaps="handled"
      extraHeight={120}
      ref={scrollViewRef}
    >
      <Event data={innerData as TEventData} inputRef={inputCommentRef} />
      <Comments
        data={innerData as TEventData}
        inputRef={inputCommentRef}
        addComment={setSelfComment}
      />
      <CommentsInput
        value={text}
        onChange={setText}
        scrollRef={scrollViewRef}
        inputRef={inputCommentRef}
        onSubmit={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
};

export default EventPage;
