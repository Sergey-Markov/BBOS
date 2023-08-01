import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPost } from '../../interfaces';
import { RootState } from '../store';
import POSTS from '../../mocks/posts_data.json';

const initialState = POSTS.data;
export type TPosts = typeof initialState;

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<TPost>) => {
      [...state, action.payload];
    },
    addPostComment: (state, action: any) => {
      const currentPost = state.find((item) => item.id === action.payload.id);
      if (currentPost) {
        const indexCurrentPost = state.indexOf(currentPost);
        state.splice(indexCurrentPost, 1, action.payload);
      }
    },
  },
});

export const { addPost, addPostComment } = postsSlice.actions;
export const postsSelector = (state: RootState) =>
  state.rootReducers.postsReducer;
export default postsSlice.reducer;
