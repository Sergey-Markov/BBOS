import React, { RefAttributes, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import { View, Share, TextInput } from 'react-native';
import { Avatar, Text, Card, TextInputProps } from 'react-native-paper';
import {
  COMMENT_BTN_LABEL,
  SHARE_BTN_LABEL,
  SHARE_OPTIONS,
} from '../../../constants';
import { useAppTheme } from '../../../hooks/useAppTheme';
import {
  RootStackParamList,
  TAbout,
  TPost,
  TPostData,
} from '../../../interfaces';

import s from './Post.styles';
import LabelBtn from '../LabelBtn/LabelBtn';

const BTNS = [
  {
    id: '1',
    label: SHARE_BTN_LABEL,
  },
  {
    id: '2',
    label: COMMENT_BTN_LABEL,
  },
];

interface IPostProps {
  data: TPost | TPostData;
  isShort?: boolean;
  inputRef?: React.RefObject<TextInput & RefAttributes<TextInputProps>>;
}

const Post = ({ data, isShort = true, inputRef }: IPostProps) => {
  const theme = useAppTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'PostScreen'>
    >();
  if (!data) return null;
  const { title, description, date, image, about } = data;
  const normalizeDate = moment(`${date}`).format('LL HH:mm');
  const dateString = `Published: ${normalizeDate}`;

  const shareContent = useCallback(async () => {
    try {
      Share.share({
        url: SHARE_OPTIONS.url,
        message: SHARE_OPTIONS.message,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }, []);

  const focusInputHandler = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const goToPostScreenHandler = useCallback(() => {
    navigation.navigate('PostScreen', { data: data, isInputAutoFocused: true });
  }, []);

  const commentBtnHandler = isShort ? goToPostScreenHandler : focusInputHandler;

  return (
    <Card style={s(theme).event}>
      <Card.Cover
        source={{ uri: `${image}` }}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        style={s(theme).cardCover}
        resizeMode="cover"
      />
      <Card.Content style={s(theme).cardContent}>
        <Text variant="titleLarge" numberOfLines={isShort ? 1 : undefined}>
          {title}
        </Text>
        <Text variant="titleSmall">{dateString}</Text>
        <Text variant="bodyMedium" numberOfLines={isShort ? 5 : undefined}>
          {description}
        </Text>

        <View style={s(theme).aboutBox}>
          {about.map((item: TAbout) => {
            const { id, count, icon, selectedIcon, selected } = item;
            return (
              <View key={id} style={s(theme).eventIconBox}>
                <Avatar.Icon size={24} icon={selected ? selectedIcon : icon} />
                <Text>{count}</Text>
              </View>
            );
          })}
        </View>
      </Card.Content>

      <Card.Actions style={s(theme).actionWrapper}>
        {BTNS.map(({ id, label }) => {
          const isShareBtn = label === SHARE_BTN_LABEL;
          return (
            <LabelBtn
              key={id}
              label={label}
              onPress={isShareBtn ? shareContent : commentBtnHandler}
            />
          );
        })}
      </Card.Actions>
    </Card>
  );
};

export default Post;
