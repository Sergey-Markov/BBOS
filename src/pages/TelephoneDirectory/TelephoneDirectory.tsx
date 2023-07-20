import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import TelephoneDirectoryCard from '../../components/shared/TelephoneDirectoryCard/TelephoneDirectoryCard';
import { useAppTheme } from '../../hooks/useAppTheme';
import telephoneDirectory from '../../mocks/telephone_directory.json';

import s from './TelephoneDirectory.styles';

const telephones = telephoneDirectory.telephone_directory_data;

const TelephoneDirectory = () => {
  const theme = useAppTheme();

  return (
    <ScrollView contentContainerStyle={s(theme).container}>
      {telephones.map((item, index) => (
        <View key={index}>
          <TelephoneDirectoryCard options={item} />
          <Divider horizontalInset={true} style={s(theme).divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default TelephoneDirectory;
