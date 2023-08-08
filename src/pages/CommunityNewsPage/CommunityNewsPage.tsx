import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text } from 'react-native-paper';
import moment from 'moment';
import { useAppTheme } from '../../hooks/useAppTheme';
import { IScreenProps } from '../../interfaces';

import s from './CommunityNewsPage.styles';
import { newsSelector } from '../../redux/reducers/newsReducer';
import { useSelector } from 'react-redux';

const CommunityNewsPage = ({
  navigation,
  route,
}: IScreenProps<'CommunityNewsPage'>) => {
  const allNews = useSelector(newsSelector);
  const theme = useAppTheme();
  const { communityNewsData } = route.params;
  const { id, title, urlToImage, publishedAt, description, link } =
    communityNewsData;
  const currentDate = moment(publishedAt).format('LL');

  return (
    <ScrollView style={s(theme).container}>
      <View key={id}>
        <Image
          style={s(theme).img}
          source={{ uri: urlToImage }}
          alt="link to current community news"
        />
        <View style={s(theme).titleContent}>
          <Text variant="titleSmall" numberOfLines={4}>
            {title}
          </Text>
          <Text variant="bodySmall">{currentDate}</Text>
        </View>
        <Text variant="bodyMedium" style={s(theme).description}>
          {description}
        </Text>
        {link.length > 0 && (
          <WebView
            style={{
              width: '100%',
              height: 600,
              backgroundColor: 'transparent',
            }}
            source={{
              uri: link,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CommunityNewsPage;
