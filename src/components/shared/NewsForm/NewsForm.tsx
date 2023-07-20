import React, { useCallback, useState } from 'react';
import { Button, SafeAreaView } from 'react-native';
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
          const ressetFieldHandler = useCallback((field: TValues) => {
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

              <GoogleFormInputModal
                onReset={() => ressetFieldHandler('link')}
                onChange={handleChange('link')}
                onModalToggler={modalToggler}
                value={values.link}
                isModalVisible={isModalVisible}
              />
              <Button onPress={handleSubmit} title={SUBMIT_BTN_LABEL} />
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default NewsForm;
