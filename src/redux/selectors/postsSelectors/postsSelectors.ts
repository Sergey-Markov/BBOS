import { TPosts } from '../../reducers/postsReducers';
import { RootState } from '../../store';

export const getPosts = (state: RootState) => {
  return state.rootReducers.postsReducer;
};

export const findPostById = (posts: TPosts, id: string) => {
  const result = posts.find((item) => item.id === id);
  console.log(result?.id);
  return result;
};
