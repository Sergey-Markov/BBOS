import React, { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Comments from '../../components/shared/Comments/Comments';
import CommentsInput from '../../components/shared/CommentsInput/CommentsInput';
import Post from '../../components/shared/Post/Post';
import { IScreenProps, TComment, TPost } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { addPostComment } from '../../redux/reducers/postsReducers';
import { useSelector } from 'react-redux';
import { getPosts } from '../../redux/selectors/postsSelectors/postsSelectors';
import { AnyAction } from '@reduxjs/toolkit';

const PostScreen = ({ navigation, route }: IScreenProps<'PostScreen'>) => {
  if (!route.params) {
    return null;
  }
  const dispatch = useDispatch();
  const allPost = useSelector(getPosts);
  const { data, isInputAutoFocused } = route.params;
  const [text, setText] = useState('');

  const currentPost = allPost.find((item) => item.id === data?.id);

  if (!currentPost) {
    return null;
  }

  const [selfComment, setSelfComment] = useState<TComment>({
    id: '0',
    parentId: '',
    userName: 'Serhiy',
    userId: '777',
    message: '',
    create_at: new Date().getTime(),
  });

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const inputCommentRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      if (isInputAutoFocused) {
        inputCommentRef.current?.focus();
      }
    }, [])
  );

  const handleSubmit = () => {
    const newComment = {
      ...selfComment,
      message: text,
      id: (Math.random() * 1000).toFixed(0).toString(),
    };

    if (currentPost) {
      const updatePost = {
        ...currentPost,
        comments: [...currentPost.comments, newComment],
      };
      dispatch(addPostComment(updatePost as TPost));
    }
    setSelfComment((prev) => {
      return { ...prev, parentId: '', message: '' };
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingBottom: 60,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
      }}
      keyboardShouldPersistTaps="handled"
      extraHeight={120}
      ref={scrollViewRef}
    >
      <Post data={data} isShort={false} inputRef={inputCommentRef} />
      <Comments
        data={currentPost as any}
        inputRef={inputCommentRef}
        addComment={setSelfComment}
      />
      <CommentsInput
        value={text}
        onChange={setText}
        scrollRef={scrollViewRef}
        inputRef={inputCommentRef}
        onSubmit={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
};

export default PostScreen;
