import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { IconButton, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DatePickerModal } from 'react-native-paper-dates';
import { registerTranslation } from 'react-native-paper-dates';
import { TimePickerModal } from 'react-native-paper-dates';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import { useAppTheme } from '../../../hooks/useAppTheme';
import LabelBtn from '../LabelBtn/LabelBtn';
import InputCustom from '../InputCustom/InputCustom';
import ImgPicker from '../ImgPicker/ImgPicker';
import moment from 'moment';
import 'moment/locale/uk';
import {
  DATE_PICKER_MODAL_LABEL,
  INPUT_DESCRIPTION_LABEL,
  INPUT_LOCATION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';

import s from './EventForm.styles';
import { ABOUT_MOCK } from '../../../mocks/default_data_mock';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addEventPost } from '../../../redux/reducers/eventsReducer';

registerTranslation('ru', {
  save: 'Зберегти',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat: string) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date: string) => `Must be later then ${date}`,
  mustBeLowerThan: (date: string) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate: string, endDate: string) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
});

type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };
type TInitialValues = {
  title: string;
  description: string;
  date: Date;
  time: { hours: number; minutes: number };
  location: string;
  image: null | ImagePickerResult;
};

const initialValues: TInitialValues = {
  title: '',
  description: '',
  date: new Date(),
  time: { hours: 23, minutes: 30 },
  location: '',
  image: null,
};

const startYearFor = initialValues.date.getFullYear();
const endYearFor = startYearFor + 5;

type TValues = keyof TInitialValues;
type TDateParam = {
  date: Date;
};
interface INewsForm {
  scrollRef: React.RefObject<KeyboardAwareScrollView>;
}

const INPUTS_ARR = [
  {
    id: '1',
    label: INPUT_TITLE_LABEL,
    value: 'title',
  },
  {
    id: '2',
    label: INPUT_LOCATION_LABEL,
    value: 'location',
  },
  {
    id: '3',
    label: INPUT_DESCRIPTION_LABEL,
    value: 'description',
  },
];

const EventForm = ({ scrollRef }: INewsForm) => {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleCalendarShow = useCallback(() => {
    setIsShowCalendar((prev) => !prev);
  }, []);

  const toggleTimeShow = useCallback(() => {
    setIsShowTimePicker((prev) => !prev);
  }, []);
  const strDate = new Date().toJSON();

  return (
    <SafeAreaView style={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (
            values.image === null ||
            values.title.length <= 0 ||
            values.description.length <= 0
          ) {
            Alert.alert('Add fields information');
            return;
          }
          if (values.image.assets) {
            const imgString = values.image.assets[0].uri;
            const newEventPost = {
              ...values,
              date: strDate,
              time: `${values.time.hours}:${values.time.minutes}`,
              about: ABOUT_MOCK,
              comments: [],
              image: imgString,
              id: (Math.random() * 1000).toFixed(0).toString(),
            };
            dispatch(addEventPost(newEventPost));
            navigation.goBack();
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }: FormikValues) => {
          const resetFieldHandler = useCallback((field: TValues) => {
            setFieldValue(field, initialValues[field]);
          }, []);

          const onConfirmSingle = useCallback(
            ({ date }: TDateParam) => {
              toggleCalendarShow();
              setFieldValue('date', date);
            },
            [setIsShowCalendar]
          );

          const onConfirmTime = useCallback(
            ({ hours, minutes }: TInitialValues['time']) => {
              toggleTimeShow();
              const result = {
                hours,
                minutes,
              };
              setFieldValue('time', result);
            },
            [setIsShowTimePicker]
          );

          const selectedDate = moment(values.date).format('LL');
          const selectedTime = `${values.time.hours}:${values.time.minutes}`;
          const handleImgChange = (data: ImagePickerResult) => {
            setFieldValue('image', data);
          };

          return (
            <ScrollView contentContainerStyle={s.formikContainer}>
              <ImgPicker
                data={values.image}
                onChange={handleImgChange}
                onReset={() => resetFieldHandler('image')}
              />
              {INPUTS_ARR.map((item) => {
                return (
                  <InputCustom
                    key={item.id}
                    label={item.label}
                    value={values[item.value]}
                    onReset={() =>
                      resetFieldHandler(
                        item.value as 'title' | 'description' | 'location'
                      )
                    }
                    onChange={handleChange(item.value)}
                    onBlur={handleBlur(item.value)}
                    scrollRef={scrollRef}
                    multiline
                  />
                );
              })}
              <View style={s.dateBox}>
                <Text>Date:</Text>
                <Text>{selectedDate}</Text>
                <IconButton
                  icon="calendar"
                  iconColor={theme.colors.primary}
                  onPress={toggleCalendarShow}
                />
                <Text>{selectedTime}</Text>
                <IconButton
                  icon="alarm"
                  iconColor={theme.colors.primary}
                  onPress={toggleTimeShow}
                />
              </View>

              <LabelBtn
                mode="contained"
                label={SUBMIT_BTN_LABEL}
                onPress={handleSubmit}
              />

              <DatePickerModal
                locale="ru"
                label={DATE_PICKER_MODAL_LABEL}
                date={values.date}
                visible={isShowCalendar}
                onDismiss={toggleCalendarShow}
                onConfirm={onConfirmSingle}
                mode="single"
                startYear={startYearFor}
                endYear={endYearFor}
              />
              <TimePickerModal
                visible={isShowTimePicker}
                onDismiss={toggleTimeShow}
                onConfirm={onConfirmTime}
                hours={23}
                minutes={14}
                use24HourClock
              />
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default EventForm;
