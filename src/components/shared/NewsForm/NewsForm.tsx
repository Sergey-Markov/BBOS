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
import {
  addDataToFirebase,
  auth,
  uploadImgToStorage,
} from '../../../../firebase';

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
  const [imgUrlFromStorage, setImgUrlFromStorage] = useState<string>('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modalToggler = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);
  const strDate = new Date();

  return (
    <SafeAreaView style={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (
            values.urlToImage === null ||
            values.title.length <= 0 ||
            values.description.length <= 0
          ) {
            Alert.alert('Add fields information');
            return;
          }
          if (values.urlToImage.assets) {
            await uploadImgToStorage(
              values.urlToImage.assets[0].base64,
              setImgUrlFromStorage
            );
            // console.log(imgUrlFromStorage);
            const imgString = values.urlToImage.assets[0].uri;
            const imgUriArr = imgString.split('/');
            const imgName = imgUriArr[imgUriArr.length - 1];
            const newNewsPost = {
              // ...values,
              title: values.title,
              description: values.description,
              link: values.link,
              publishedAt: Number(strDate),
              // urlToImage: values.urlToImage,
              img: {
                uri: imgString,
                name: imgName,
                storageLink: imgUrlFromStorage,
              },
              id: (Math.random() * 1000).toFixed(0).toString(),
              user: {
                id: auth.currentUser?.uid,
                name: auth.currentUser?.displayName,
              },
            };
            console.log(newNewsPost);
            await addDataToFirebase('communityNews', newNewsPost);

            // dispatch(addNews(newNewsPost));
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
