import React, { RefAttributes, useCallback } from 'react';
import moment from 'moment';
import { View, Share, TextInput } from 'react-native';
import { Avatar, Text, Button, Card, TextInputProps } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { TAbout, TEventData } from '../../../interfaces';
import {
  COMMENT_BTN_LABEL,
  SHARE_BTN_LABEL,
  SHARE_OPTIONS,
} from '../../../constants';

import s from './Event.styles';

interface IEventProps {
  data: TEventData;
  isShort?: boolean;
  inputRef?: React.RefObject<TextInput & RefAttributes<TextInputProps>>;
}

const Event = ({ data, isShort = false, inputRef }: IEventProps) => {
  const theme = useAppTheme();
  const { id, title, description, date, time, location, image, about } = data;
  const normalizeDate = moment(`${date} ${time}`).format('LL HH:mm');
  const dateLocationString = `${normalizeDate} ${location}`;

  const shareContent = async () => {
    try {
      Share.share({
        url: SHARE_OPTIONS.url,
        message: SHARE_OPTIONS.message,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const focusInputHandler = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Card key={id} style={s(theme).event}>
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
        <Text variant="titleSmall">{dateLocationString}</Text>
        <Text variant="bodyMedium" numberOfLines={isShort ? 1 : undefined}>
          {description}
        </Text>
        {!isShort && (
          <View style={s(theme).aboutBox}>
            {about.map((item: TAbout) => {
              const { id, count, icon, selectedIcon, selected } = item;

              return (
                <View key={id} style={s(theme).eventIconBox}>
                  <Avatar.Icon
                    size={24}
                    icon={selected ? selectedIcon : icon}
                  />
                  <Text>{count}</Text>
                </View>
              );
            })}
          </View>
        )}
      </Card.Content>
      {!isShort && (
        <Card.Actions>
          <Button labelStyle={s(theme).btnShareLabel} onPress={shareContent}>
            {SHARE_BTN_LABEL}
          </Button>
          <Button
            labelStyle={s(theme).btnCommentLabel}
            onPress={focusInputHandler}
          >
            {COMMENT_BTN_LABEL}
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

export default Event;
