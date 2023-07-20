import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, List } from 'react-native-paper';
import { View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IScreenProps } from '../../interfaces';

import s from './News.styles';

const NEWS_LIST = [
  {
    id: 1,
    title: 'fakty.com.ua',
    url: 'https://fakty.com.ua/ua/news/',
    icon: require('../../../assets/newsImages/faktyNews.png'),
  },
  {
    id: 2,
    title: 'google-news-ua',
    url: 'https://news.google.com/home?hl=uk&gl=UA&ceid=UA:uk',
    icon: require('../../../assets/newsImages/googleNews.jpeg'),
  },
  {
    id: 3,
    title: 'ukr.net',
    url: 'https://www.ukr.net/news/main.html',
    icon: require('../../../assets/newsImages/ukrnet.jpeg'),
  },
  {
    id: 4,
    title: 'korrespondent.net',
    url: 'https://ua.korrespondent.net/',
    icon: require('../../../assets/newsImages/korrespondent.jpeg'),
  },
  {
    id: 5,
    title: 'tsn.ua',
    url: 'https://tsn.ua/',
    icon: require('../../../assets/newsImages/tsn.png'),
  },
  {
    id: 6,
    title: 'pravda.com.ua',
    url: 'https://www.pravda.com.ua/news/',
    icon: require('../../../assets/newsImages/pravda.png'),
  },
  {
    id: 7,
    title: 'www.ukrinform.ua',
    url: 'https://www.ukrinform.ua/',
    icon: require('../../../assets/newsImages/ukrinform.png'),
  },
  {
    id: 8,
    title: 'www.bbc.com',
    url: 'https://www.bbc.com/ukrainian',
    icon: require('../../../assets/newsImages/bbcNews.png'),
  },
  {
    id: 9,
    title: 'unian.ua',
    url: 'https://www.unian.ua/',
    icon: require('../../../assets/newsImages/unianNews.webp'),
  },
];

const News = ({ navigation, route }: IScreenProps<'News'>) => {
  const theme = useAppTheme();

  return (
    <ScrollView>
      {NEWS_LIST.map((item) => {
        return (
          <View key={item.id}>
            <List.Item
              key={item.id}
              title={item.title}
              titleEllipsizeMode="clip"
              left={(props) => <List.Icon {...props} icon={item.icon} />}
              onPress={() =>
                navigation.navigate('WebViewPage', {
                  url: item.url,
                  screen: item.title,
                })
              }
            />
            <Divider style={s(theme).divider} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default News;
