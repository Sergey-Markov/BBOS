import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { COMMUNITY_NEWS_DATA } from '../../mocks/communityNewsMock';

const initialState = COMMUNITY_NEWS_DATA;
export type TNewsPost = (typeof initialState)[0];

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    // addPostComment: (state, action: PayloadAction<any>) => {
    //   const currentPost = state.find((item) => item.id === action.payload.id);
    //   if (currentPost) {
    //     const indexCurrentPost = state.indexOf(currentPost);
    //     state.splice(indexCurrentPost, 1, action.payload);
    //   }
    // },
  },
});

export const { addNews } = newsSlice.actions;
export const newsSelector = (state: RootState) =>
  state.rootReducers.newsReducer;
export default newsSlice.reducer;
