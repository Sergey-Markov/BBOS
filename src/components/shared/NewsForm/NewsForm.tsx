import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import ImgPicker from '../ImgPicker/ImgPicker';
import GoogleFormInputModal from '../GoogleFormInputModal/GoogleFormInputModal';
import {
  INPUT_DESCRIPTION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';

import s from './NewsForm.styles';
import LabelBtn from '../LabelBtn/LabelBtn';

const initialValues = {
  title: '',
  description: '',
  date: new Date(),
  image: null,
  link: '',
};

type TInitialValues = typeof initialValues;
type TValues = keyof TInitialValues;

type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };

const NewsForm = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const modalToggler = useCallback(() => {
    setIsModalVisible((prev) => !prev);
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
          const resetFieldHandler = useCallback((field: TValues) => {
            setFieldValue(field, initialValues[field]);
          }, []);

          const handleImgChange = useCallback(
            (data: ImagePickerResult) => {
              setFieldValue('image', data);
            },
            [setFieldValue]
          );

          return (
            <ScrollView contentContainerStyle={s.formikContainer}>
              <ImgPicker
                data={values.image}
                onChange={handleImgChange}
                onReset={() => resetFieldHandler('image')}
              />
              <TextInput
                mode="outlined"
                label={INPUT_TITLE_LABEL}
                right={
                  <TextInput.Icon
                    icon="close"
                    size={20}
                    onPress={() => resetFieldHandler('title')}
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
                label={INPUT_DESCRIPTION_LABEL}
                right={
                  <TextInput.Icon
                    icon="close"
                    size={20}
                    onPress={() => resetFieldHandler('description')}
                  />
                }
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                textBreakStrategy="balanced"
                multiline
              />

              <GoogleFormInputModal
                onReset={() => resetFieldHandler('link')}
                onChange={handleChange('link')}
                onModalToggler={modalToggler}
                value={values.link}
                isModalVisible={isModalVisible}
              />
              <LabelBtn
                mode="contained"
                label={SUBMIT_BTN_LABEL}
                onPress={handleSubmit}
              />
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default NewsForm;
