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
    addPost: (state, action: PayloadAction<TPosts>) => {
      [...state, action.payload];
    },
  },
});
export const { addPost } = postsSlice.actions;
export const postsSelector = (state: RootState) =>
  state.rootReducers.postsReducer;
export default postsSlice.reducer;
