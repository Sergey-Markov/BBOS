import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCallback } from 'react';

interface IGoBackBtnProps {
  onPress?: () => void;
}

const GoBackBtn = ({ onPress }: IGoBackBtnProps) => {
  const navigation = useNavigation();

  const goBackHandler = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, []);

  return (
    <Pressable onPress={onPress ? onPress : goBackHandler}>
      <Ionicons name="md-chevron-back-outline" color="#fff" size={24} />
    </Pressable>
  );
};

export default GoBackBtn;
