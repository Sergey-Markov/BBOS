import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import TelephoneDirectoryCard from '../../components/shared/TelephoneDirectoryCard/TelephoneDirectoryCard';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useSelector } from 'react-redux';
import { globalDataSelector } from '../../redux/reducers/globalDataReducer';

import s from './TelephoneDirectory.styles';

type TTelephonesItem = {
  photo: null;
  name: string;
  official_position: string;
  tel: string[];
};
const TelephoneDirectory = () => {
  const globalData = useSelector(globalDataSelector);
  const telephones = globalData[0].telephone_directory_data;
  const theme = useAppTheme();

  return (
    <ScrollView contentContainerStyle={s(theme).container}>
      {telephones.map((item: TTelephonesItem, index: number) => (
        <View key={index}>
          <TelephoneDirectoryCard options={item} />
          <Divider horizontalInset={true} style={s(theme).divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default TelephoneDirectory;
