import React, { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { TextInput } from 'react-native-paper';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import ImgPicker from '../ImgPicker/ImgPicker';
import { ScrollView } from 'react-native-gesture-handler';
import {
  INPUT_DESCRIPTION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';
import LabelBtn from '../LabelBtn/LabelBtn';

import s from './PostForm.styles';
import InputCustom from '../InputCustom/InputCustom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const INPUTS_ARR = [
  {
    id: '1',
    label: INPUT_TITLE_LABEL,
    name: 'title',
  },
  {
    id: '2',
    label: INPUT_DESCRIPTION_LABEL,
    name: 'description',
  },
];

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

interface IPostForm {
  scrollRef: React.RefObject<KeyboardAwareScrollView>;
}

const PostForm = ({ scrollRef }: IPostForm) => {
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
              {INPUTS_ARR.map(({ id, label, name }) => {
                return (
                  <InputCustom
                    key={id}
                    label={label}
                    value={values[name]}
                    onReset={() =>
                      resetFieldHandler(name as 'title' | 'description')
                    }
                    onChange={handleChange(name)}
                    onBlur={handleBlur(name)}
                    scrollRef={scrollRef}
                    multiline
                  />
                );
              })}
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
