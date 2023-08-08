import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { EVENTS_DATA } from '../../mocks/eventsMock';

const initialState = EVENTS_DATA;
export type TEventsPost = (typeof initialState)[0];

export const eventsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<TEventsPost>) => {
      state.push(action.payload);
    },
  },
});

export const { addPost } = eventsSlice.actions;
export const eventsSelector = (state: RootState) =>
  state.rootReducers.eventsReducer;
export default eventsSlice.reducer;
