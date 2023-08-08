import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import { useDispatch } from 'react-redux';
import { addNews } from '../../../redux/reducers/newsReducer';
import { useNavigation } from '@react-navigation/native';

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

type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };

type TInitialValues = {
  title: string;
  description: string;
  urlToImage: ImagePickerResult | null;
  link: string;
};

const initialValues: TInitialValues = {
  title: '',
  description: '',
  urlToImage: null,
  link: '',
};

type TValues = keyof TInitialValues;

interface INewsForm {
  scrollRef: React.RefObject<KeyboardAwareScrollView>;
}

const NewsForm = ({ scrollRef }: INewsForm) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modalToggler = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);
  const strDate = new Date().toJSON();

  return (
    <SafeAreaView style={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (
            values.urlToImage === null ||
            values.title.length <= 0 ||
            values.description.length <= 0
          ) {
            Alert.alert('Add fields information');
            return;
          }
          if (values.urlToImage.assets) {
            const imgString = values.urlToImage.assets[0].uri;
            const newNewsPost = {
              ...values,
              date: strDate,
              urlToImage: imgString,
              id: (Math.random() * 1000).toFixed(0).toString(),
            };
            dispatch(addNews(newNewsPost));
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

          const handleImgChange = useCallback(
            (data: ImagePickerResult) => {
              setFieldValue('urlToImage', data);
            },
            [setFieldValue]
          );

          return (
            <ScrollView contentContainerStyle={s.formikContainer}>
              <ImgPicker
                data={values.urlToImage}
                onChange={handleImgChange}
                onReset={() => resetFieldHandler('urlToImage')}
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
