import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import { Portal } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../interfaces';

import s from './AddPostBtn.styles';

const AddPostBtn = () => {
  const theme = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Forms'>>();

  const goToPostFormHandler = useCallback(() => {
    navigation.navigate('Forms', { formTitle: 'Add Post' });
  }, []);

  return (
    <Portal>
      <Pressable style={s(theme).container} onPress={goToPostFormHandler}>
        <Ionicons name="add-outline" size={25} />
      </Pressable>
    </Portal>
  );
};

export default AddPostBtn;
