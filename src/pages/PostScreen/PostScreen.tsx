import React, { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Comments from '../../components/shared/Comments/Comments';
import CommentsInput from '../../components/shared/CommentsInput/CommentsInput';
import Post from '../../components/shared/Post/Post';
import { TComment, TPost, TPostData } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { addPostComment } from '../../redux/reducers/postsReducers';

const PostScreen = ({ navigation, route }: any) => {
  if (!route.params) {
    return null;
  }
  const dispatch = useDispatch();
  const { data, isInputAutoFocused } = route.params;
  const [text, setText] = useState('');
  const [postData, setPostData] = useState<TPost | TPostData>(data);

  const [selfComment, setSelfComment] = useState<TComment>({
    id: 0,
    parentId: null,
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
      id: (Math.random() * 1000).toFixed(0),
    };

    setPostData((prev) => {
      if (prev) {
        const updatePost = {
          ...prev,
          comments: [...prev.comments, newComment],
        };
        dispatch(addPostComment(updatePost));

        return updatePost;
      }
    });

    setSelfComment((prev) => {
      return { ...prev, parentId: null, message: '' };
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
      <Post data={postData} isShort={false} inputRef={inputCommentRef} />
      <Comments
        data={postData as TPost}
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
