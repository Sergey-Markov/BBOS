import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { IScreenProps } from '../../interfaces';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from '../../components/shared/Swiper/Swiper';
import { Text } from 'react-native-paper';
import Event from '../../components/shared/Event/Event';
import { EVENTS_DATA } from '../../mocks/eventsMock';
import Advertising from '../../components/shared/Advertising/Advertising';
import CommunityNewsList from '../../components/shared/CommunityNewsList/CommunityNewsList';
import { COMMUNITY_NEWS_DATA } from '../../mocks/communityNewsMock';

import { useFocusEffect } from '@react-navigation/native';
import FormsBtn from '../../components/shared/FormsBtn/FormsBtn';

const Home = ({ navigation, route }: IScreenProps<'Home'>) => {
  const [isFormBtn, setFormBtn] = useState<boolean>(false);
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
    const data = COMMUNITY_NEWS_DATA.find((item) => {
      const result = String(item.id) === String(id);
      return result;
    });
    if (!data) return;
    navigation.navigate('CommunityNewsPage', { communityNewsData: data });
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10, paddingTop: 5 }}>
      <Text variant="titleMedium">Community events:</Text>
      <Swiper dataOptions={EVENTS_DATA}>
        {(item) => {
          return (
            <Pressable onPress={() => goToSelectedEvent(item.id)}>
              <Event data={item} isShort />
            </Pressable>
          );
        }}
      </Swiper>
      <Advertising />
      <Text variant="titleMedium" style={{ marginVertical: 5 }}>
        Community news:
      </Text>
      <CommunityNewsList
        data={COMMUNITY_NEWS_DATA}
        onSelect={goToSelectedCommunityNews}
      />
      {isFormBtn && <FormsBtn />}
    </ScrollView>
  );
};

export default Home;
