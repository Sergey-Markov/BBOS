import React, { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { TextInput } from 'react-native-paper';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import ImgPicker from '../ImgPicker/ImgPicker';
import { ScrollView } from 'react-native-gesture-handler';

import s from './PostForm.styles';
import {
  INPUT_DESCRIPTION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';
import LabelBtn from '../LabelBtn/LabelBtn';

const initialValues = {
  title: '',
  description: '',
  date: new Date(),
  time: { hours: 23, minutes: 30 },
  location: '',
  image: null,
};

type TInitialValues = typeof initialValues;
type TValues = keyof TInitialValues;

type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };

const PostForm = () => {
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

          const handleImgChange = (data: ImagePickerResult) => {
            setFieldValue('image', data);
          };

          return (
            <ScrollView contentContainerStyle={s.scrollWrapper}>
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
              <View style={s.btnWrapper}>
                <LabelBtn
                  mode="contained"
                  onPress={handleSubmit}
                  label={SUBMIT_BTN_LABEL}
                />
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default PostForm;
