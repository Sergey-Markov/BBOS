import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, View } from 'react-native';
import { Formik, FormikValues } from 'formik';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import ImgPicker from '../ImgPicker/ImgPicker';
import { ScrollView } from 'react-native-gesture-handler';
import {
  INPUT_DESCRIPTION_LABEL,
  INPUT_TITLE_LABEL,
  SUBMIT_BTN_LABEL,
} from '../../../constants';
import LabelBtn from '../LabelBtn/LabelBtn';
import InputCustom from '../InputCustom/InputCustom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addPost } from '../../../redux/reducers/postsReducers';

import s from './PostForm.styles';

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
  image: null | ImagePickerResult;
};

const initialValues: TInitialValues = {
  title: '',
  description: '',
  image: null,
};

type TValues = keyof TInitialValues;

interface IPostForm {
  scrollRef: React.RefObject<KeyboardAwareScrollView>;
}

const PostForm = ({ scrollRef }: IPostForm) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
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
            const newPost = {
              ...values,
              date: strDate,
              about: [
                {
                  id: '1',
                  name: 'likes',
                  count: 0,
                  icon: 'thumb-up-outline',
                  selectedIcon: 'thumb-up',
                  selected: false,
                },
                {
                  id: '2',
                  name: 'dislikes',
                  count: 0,
                  icon: 'thumb-down-outline',
                  selectedIcon: 'thumb-down',
                  selected: false,
                },
                {
                  id: '3',
                  name: 'comments',
                  count: 0,
                  icon: 'comment-text-outline',
                  selectedIcon: 'comment-text',
                  selected: false,
                },
              ],
              comments: [],
              image: imgString,
              id: (Math.random() * 1000).toFixed(0).toString(),
            };
            dispatch(addPost(newPost));
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
                  onPress={(e: string) => {
                    handleSubmit(e);
                  }}
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
