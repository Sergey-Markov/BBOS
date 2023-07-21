import { StyleSheet } from 'react-native';

const styles = (theme: any) =>
  StyleSheet.create({
    commentsWrapper: {
      gap: 5,
    },
    commentsBox: {
      borderRadius: 20,
      backgroundColor: theme.colors.tertiaryContainer,
      gap: 10,
    },
    commentsUser: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    eventCommentText: {
      borderLeftWidth: 1,
      borderBottomLeftRadius: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 7,
      paddingRight: 15,
      marginLeft: 15,
    },
    subcommentBox: {
      top: -10,
      marginLeft: 30,
    },
    commentBtnWrapper: {
      alignSelf: 'flex-end',
      marginRight: 10,
    },
  });

export default styles;
