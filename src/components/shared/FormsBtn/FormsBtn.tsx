import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FAB, Portal } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { RootStackParamList } from '../../../interfaces';
import callPhoneHandler from '../../../utils/callPhoneHandler';
import {
  FORMS_BTN_EVENT_LABEL,
  FORMS_BTN_NEWS_LABEL,
  FORMS_BTN_POST_LABEL,
  FORMS_SCREEN_EVENT_TITLE,
  FORMS_SCREEN_NEWS_TITLE,
  FORMS_SCREEN_POST_TITLE,
  OPEN_GATE_BTN_LABEL,
} from '../../../constants';
import { useSelector } from 'react-redux';
import { globalDataSelector } from '../../../redux/reducers/globalDataReducer';

import s from './FormsBtn.styles';

const FormsBtn = () => {
  const globalData = useSelector(globalDataSelector);
  const gatePhoneNumber = globalData[0].community_data.gatePhoneNumber;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Forms'>>();

  const toggleHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const btnOptions = useMemo(() => {
    return [
      {
        icon: 'calendar-today',
        label: FORMS_BTN_EVENT_LABEL,
        labelTextColor: theme.colors.whiteText,
        onPress: () =>
          navigation.navigate('Forms', { formTitle: FORMS_SCREEN_EVENT_TITLE }),
      },
      {
        icon: 'newspaper-variant-outline',
        label: FORMS_BTN_NEWS_LABEL,
        labelTextColor: theme.colors.whiteText,
        onPress: () =>
          navigation.navigate('Forms', { formTitle: FORMS_SCREEN_NEWS_TITLE }),
      },
      {
        icon: 'pencil',
        label: FORMS_BTN_POST_LABEL,
        labelTextColor: theme.colors.whiteText,
        onPress: () =>
          navigation.navigate('Forms', { formTitle: FORMS_SCREEN_POST_TITLE }),
      },
      {
        icon: 'boom-gate-arrow-up-outline',
        label: OPEN_GATE_BTN_LABEL,
        labelTextColor: theme.colors.whiteText,
        onPress: () => callPhoneHandler(gatePhoneNumber),
      },
    ];
  }, []);

  const openIconName = isOpen ? 'close' : 'plus';

  return (
    <Portal>
      <FAB.Group
        variant="secondary"
        style={s.fab}
        backdropColor={theme.backdrop}
        open={isOpen}
        visible
        icon={openIconName}
        actions={btnOptions}
        onStateChange={toggleHandler}
      />
    </Portal>
  );
};

export default FormsBtn;
