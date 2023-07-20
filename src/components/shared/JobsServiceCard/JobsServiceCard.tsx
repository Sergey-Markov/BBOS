import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { JobsServiceCardType, RootStackParamList } from '../../../interfaces';

import s from './JobsServiceCard.styles';

interface IJobsServiceCardProps {
  service: JobsServiceCardType;
}

const JobsServiceCard = ({ service }: IJobsServiceCardProps) => {
  const { iconMaterialCommunityIcons, jobTitle } = service;
  const theme = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'JobsList'>>();

  const goToJobsList = useCallback(() => {
    navigation.navigate('JobsList', { service });
  }, []);

  return (
    <Pressable style={s(theme).container} onPress={goToJobsList}>
      <Icon
        name={iconMaterialCommunityIcons}
        size={60}
        color={theme.colors.secondary}
      />
      <Text variant="bodyLarge" style={s(theme).label}>
        {jobTitle}
      </Text>
    </Pressable>
  );
};

export default JobsServiceCard;
