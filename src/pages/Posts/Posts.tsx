import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { IScreenProps, TPostData } from '../../interfaces';
import { useFocusEffect } from '@react-navigation/native';
import Post from '../../components/shared/Post/Post';
import AddPostBtn from '../../components/shared/AddPostBtn/AddPostBtn';
import { useSelector } from 'react-redux';
import { getPosts } from '../../redux/selectors/postsSelectors/postsSelectors';

import s from './Posts.styles';

const Posts = ({ navigation, route }: IScreenProps<'Posts'>) => {
  const posts = useSelector(getPosts);
  const [isFormBtn, setFormBtn] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (!isFormBtn) {
        setFormBtn(true);
      }
      return () => setFormBtn(false);
    }, [])
  );

  const handlePress = useCallback((item: TPostData) => {
    navigation.navigate('PostScreen', { data: item });
  }, []);

  return (
    <ScrollView contentContainerStyle={s.container}>
      {posts.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              handlePress(item);
            }}
          >
            <Post data={item} />
          </Pressable>
        );
      })}
      {isFormBtn && <AddPostBtn />}
    </ScrollView>
  );
};

export default Posts;
