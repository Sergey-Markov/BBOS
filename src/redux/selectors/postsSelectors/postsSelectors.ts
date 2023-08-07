import { RootState } from '../../store';

export const getPosts = (state: RootState) => {
  return state.rootReducers.postsReducer;
};
