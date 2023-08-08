import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { EVENTS_DATA } from '../../mocks/eventsMock';

const initialState = EVENTS_DATA;
export type TEventsPost = (typeof initialState)[0];

export const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEventPost: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    addEventComment: (state, action: PayloadAction<any>) => {
      const currentEvent = state.find((item) => item.id === action.payload.id);
      if (currentEvent) {
        const indexCurrentEvent = state.indexOf(currentEvent);
        state.splice(indexCurrentEvent, 1, action.payload);
      }
    },
  },
});

export const { addEventPost, addEventComment } = eventsSlice.actions;
export const eventsSelector = (state: RootState) =>
  state.rootReducers.eventsReducer;
export default eventsSlice.reducer;
