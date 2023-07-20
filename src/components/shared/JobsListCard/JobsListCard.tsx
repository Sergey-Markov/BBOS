import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import callPhoneHandler from '../../../utils/callPhoneHandler';

import s from './JobsListCard.styles';

interface IJobsListCardProps {
  job: {
    name: string;
    tel: string[];
    description: string;
  };
}

const JobsListCard = ({ job }: IJobsListCardProps) => {
  const theme = useAppTheme();
  const { name, tel, description } = job;
  return (
    <View style={s(theme).container}>
      <View>
        <Text style={s(theme).name}>{name}</Text>
        <Text style={s(theme).tel}>{tel}</Text>
      </View>
      <Text style={s(theme).description}>{description}</Text>
      <IconButton
        mode="contained-tonal"
        containerColor={theme.tertiaryContainer}
        animated
        icon="phone"
        iconColor={theme.colors.primary}
        onPress={() => callPhoneHandler(tel)}
      />
    </View>
  );
};

export default JobsListCard;
