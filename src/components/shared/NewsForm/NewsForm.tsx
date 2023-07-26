import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import ImgPicker from '../ImgPicker/ImgPicker';
import GoogleFormInputModal from '../GoogleFormInputModal/GoogleFormInputModal';
import {
  INPUT_DESCRIPTION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';
import LabelBtn from '../LabelBtn/LabelBtn';
import InputCustom from '../InputCustom/InputCustom';

import s from './NewsForm.styles';

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
                    multiline
                  />
                );
              })}
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
