import React, { useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { IScreenProps } from '../../interfaces';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from '../../components/shared/Swiper/Swiper';
import { Text } from 'react-native-paper';
import Event from '../../components/shared/Event/Event';
import Advertising from '../../components/shared/Advertising/Advertising';
import CommunityNewsList from '../../components/shared/CommunityNewsList/CommunityNewsList';
import { useFocusEffect } from '@react-navigation/native';
import FormsBtn from '../../components/shared/FormsBtn/FormsBtn';
import { useSelector } from 'react-redux';
import { newsSelector } from '../../redux/reducers/newsReducer';
import { eventsSelector } from '../../redux/reducers/eventsReducer';
import { COMMUNITY_EVENTS_STR, COMMUNITY_NEWS_STR } from '../../constants';

import s from './Home.styles';
import { getValueFromSecureStore } from '../Login/Login';

const Home = ({ navigation, route }: IScreenProps<'Home'>) => {
  const [isFormBtn, setFormBtn] = useState<boolean>(false);
  const allNews = useSelector(newsSelector);
  const allEvents = useSelector(eventsSelector);

  useFocusEffect(
    useCallback(() => {
      if (!isFormBtn) {
        setFormBtn(true);
      }
      return () => setFormBtn(false);
    }, [])
  );

  const goToSelectedEvent = (id: string) => {
    navigation.navigate('EventPage', { id });
  };

  const goToSelectedCommunityNews = (id: string) => {
    const data = allNews.find((item) => {
      const result = String(item.id) === String(id);
      return result;
    });
    if (!data) return;
    navigation.navigate('CommunityNewsPage', { communityNewsData: data });
  };

  return (
    <ScrollView style={s.container}>
      <Text variant="titleMedium">{COMMUNITY_EVENTS_STR}</Text>
      <Swiper dataOptions={allEvents}>
        {(item) => {
          return (
            <Pressable
              style={s.cardContainer}
              onPress={() => goToSelectedEvent(item.id)}
            >
              <Event data={item} isShort />
            </Pressable>
          );
        }}
      </Swiper>
      <Advertising />
      <Text variant="titleMedium" style={s.textBox}>
        {COMMUNITY_NEWS_STR}
      </Text>
      <CommunityNewsList data={allNews} onSelect={goToSelectedCommunityNews} />
      {isFormBtn && <FormsBtn />}
    </ScrollView>
  );
};

export default Home;
