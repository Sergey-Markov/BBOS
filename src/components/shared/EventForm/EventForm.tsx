import React, { useCallback, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { DatePickerModal } from 'react-native-paper-dates';
import { registerTranslation } from 'react-native-paper-dates';
import { TimePickerModal } from 'react-native-paper-dates';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import { useAppTheme } from '../../../hooks/useAppTheme';
import ImgPicker from '../ImgPicker/ImgPicker';
import moment from 'moment';
import 'moment/locale/uk';

import s from './EventForm.styles';
import {
  DATE_PICKER_MODAL_LABEL,
  INPUT_DESCRIPTION_LABEL,
  INPUT_LOCATION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';
import LabelBtn from '../LabelBtn/LabelBtn';

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

const initialValues = {
  title: '',
  description: '',
  date: new Date(),
  time: { hours: 23, minutes: 30 },
  location: '',
  image: null,
};

const startYearFor = initialValues.date.getFullYear();
const endYearFor = startYearFor + 5;

type TInitialValues = typeof initialValues;
type TValues = keyof TInitialValues;
type TDateParam = {
  date: Date;
};
type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };

const EventForm = () => {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const theme = useAppTheme();

  const toggleCalendarShow = useCallback(() => {
    setIsShowCalendar((prev) => !prev);
  }, []);
  const toggleTimeShow = useCallback(() => {
    setIsShowTimePicker((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }: FormikValues) => {
          const ressetFieldHandler = useCallback((field: TValues) => {
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
                onReset={() => ressetFieldHandler('image')}
              />
              <TextInput
                mode="outlined"
                label={INPUT_TITLE_LABEL}
                right={
                  <TextInput.Icon
                    icon="close"
                    size={20}
                    onPress={() => ressetFieldHandler('title')}
                  />
                }
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                textBreakStrategy="balanced"
                multiline
              />
              <TextInput
                mode="outlined"
                label={INPUT_LOCATION_LABEL}
                right={
                  <TextInput.Icon
                    icon="close"
                    size={20}
                    onPress={() => ressetFieldHandler('location')}
                  />
                }
                value={values.location}
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                textBreakStrategy="balanced"
                multiline
              />
              <TextInput
                mode="outlined"
                label={INPUT_DESCRIPTION_LABEL}
                right={
                  <TextInput.Icon
                    icon="close"
                    size={20}
                    onPress={() => ressetFieldHandler('description')}
                  />
                }
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                textBreakStrategy="balanced"
                multiline
              />

              <View style={s.dateBox}>
                <Text>Date:</Text>
                <Text>{selectedDate}</Text>
                <IconButton
                  icon={'calendar'}
                  iconColor={theme.colors.primary}
                  onPress={toggleCalendarShow}
                />
                <Text>{selectedTime}</Text>
                <IconButton
                  icon={'alarm'}
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
