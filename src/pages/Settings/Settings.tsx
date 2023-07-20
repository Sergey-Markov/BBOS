import React from 'react';
import { View, Text, Button } from 'react-native';
import { IScreenProps } from '../../interfaces';

import styles from './Settings.styles';

const Settings = ({ navigation, route }: IScreenProps<'Settings'>) => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Home"
        onPress={() =>
          navigation.navigate('Home', { title: 'hey from Settings' })
        }
      />
    </View>
  );
};

export default Settings;
