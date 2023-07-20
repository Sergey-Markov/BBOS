import moment from 'moment';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { ALT_ATR_FOR_LINK_NEWS } from '../../../constants';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { TCommunityNews } from '../../../mocks/communityNewsMock';

import s from './CommunityNewsList.styles';

interface ICommunityNewsListProps {
  data: TCommunityNews;
  onSelect: (id: string) => void;
}

const CommunityNewsList = ({ data, onSelect }: ICommunityNewsListProps) => {
  const theme = useAppTheme();

  return (
    <>
      {data.map((item) => {
        const { id, title, urlToImage, publishedAt } = item;
        const currentDate = moment(publishedAt).format('LL');

        return (
          <View key={id}>
            <Pressable style={s(theme).container} onPress={() => onSelect(id)}>
              <Image
                style={s(theme).img}
                source={{ uri: urlToImage }}
                alt={ALT_ATR_FOR_LINK_NEWS}
              />
              <View style={s(theme).content}>
                <Text variant="titleSmall" numberOfLines={4}>
                  {title}
                </Text>
                <Text variant="bodySmall">{currentDate}</Text>
              </View>
            </Pressable>
            <Divider style={s(theme).divider} />
          </View>
        );
      })}
    </>
  );
};

export default CommunityNewsList;
