import React, { useEffect } from 'react';
import { View } from 'react-native';
import GoBackBtn from '../../components/shared/GoBackBtn/GoBackBtn';
import JobsListCard from '../../components/shared/JobsListCard/JobsListCard';

import { IScreenProps } from '../../interfaces';

const JobsList = ({ navigation, route }: IScreenProps<'JobsList'>) => {
  if (!route.params) {
    return null;
  }
  const { service } = route.params;
  const goBack = () => {
    navigation.navigate('Servicing', { isOpened: true });
  };
  useEffect(() => {
    navigation.setOptions({
      title: service.jobTitle,
      headerRight: () => <GoBackBtn onPress={goBack} />,
    });
  }, []);
  const workers = service.workers;
  return (
    <View>
      {workers.map((item, index) => {
        return <JobsListCard key={index} job={item} />;
      })}
    </View>
  );
};

export default JobsList;
