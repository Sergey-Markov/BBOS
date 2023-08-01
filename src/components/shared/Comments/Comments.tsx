import React, { RefAttributes, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { Avatar, Text, TextInputProps } from 'react-native-paper';
import moment from 'moment';
import { TComment, TPost } from '../../../interfaces';
import { useAppTheme } from '../../../hooks/useAppTheme';
import {
  COMMENT_BTN_LABEL,
  COMMENTS_STR,
  NO_COMMENT_STR,
} from '../../../constants';

import s from './Comments.styles';
import LabelBtn from '../LabelBtn/LabelBtn';

interface ICommentsProps {
  data: TPost;
  inputRef: React.RefObject<TextInput & RefAttributes<TextInputProps>>;
  addComment: React.Dispatch<React.SetStateAction<TComment>>;
}

const Comments = ({ data, inputRef, addComment }: ICommentsProps) => {
  const theme = useAppTheme();

  const addCommentHandler = useCallback((id: string | number) => {
    addComment((prev) => {
      return {
        ...prev,
        parentId: String(id),
      };
    });
    inputRef.current?.focus();
  }, []);

  return (
    <View style={s(theme).commentsWrapper}>
      <Text variant="titleMedium">{COMMENTS_STR}</Text>

      {data?.comments.length > 0 ? (
        data.comments.map((comment, _index, array) => {
          const userNameAvatar = comment.userName.slice(0, 1);
          const dateNormalize = moment(comment.create_at).format('LL HH:mm');
          const commentsFilteredByParentId = array.filter(({ parentId }) => {
            return parentId == comment.id;
          });
          // console.log('commentsFilteredByParentId', commentsFilteredByParentId);

          return (
            <View key={comment.id}>
              {!comment.parentId && (
                <View style={s(theme).commentsBox}>
                  <View style={s(theme).commentsUser}>
                    <Avatar.Text size={30} label={userNameAvatar} />
                    <View>
                      <Text variant="labelSmall">{comment.userName}</Text>
                      <Text variant="labelSmall">{dateNormalize}</Text>
                    </View>
                  </View>
                  <View style={s(theme).eventCommentText}>
                    <Text variant="bodyMedium">{comment.message}</Text>
                  </View>
                  {commentsFilteredByParentId.length > 0 &&
                    commentsFilteredByParentId.map((subcomment) => {
                      const userNameAvatar = subcomment.userName.slice(0, 1);
                      const dateNormalize = moment(subcomment.create_at).format(
                        'LL HH:mm'
                      );

                      return (
                        <View
                          style={s(theme).subcommentBox}
                          key={subcomment.id}
                        >
                          <View style={s(theme).commentsUser}>
                            <Avatar.Text size={30} label={userNameAvatar} />
                            <View>
                              <Text variant="labelSmall">
                                {subcomment.userName}
                              </Text>
                              <Text variant="labelSmall">{dateNormalize}</Text>
                            </View>
                          </View>
                          <View style={s(theme).eventCommentText}>
                            <Text variant="bodyMedium">
                              {subcomment.message}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  <View style={s(theme).commentBtnWrapper}>
                    <LabelBtn
                      label={COMMENT_BTN_LABEL}
                      onPress={() => {
                        addCommentHandler(comment.id);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          );
        })
      ) : (
        <Text variant="bodyMedium">{NO_COMMENT_STR}</Text>
      )}
    </View>
  );
};

export default Comments;
