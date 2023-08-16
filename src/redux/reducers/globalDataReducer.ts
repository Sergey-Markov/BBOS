import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TInitialState = {
  [key: string]: any;
};
const initialState: TInitialState = [{}];
type TGlobalDataState = typeof initialState;
export const globalDataSlice = createSlice({
  name: 'globalData',
  initialState,
  reducers: {
    setGlobalData: (state, action: PayloadAction<TGlobalDataState>) => {
      state.splice(0, state.length, action.payload);
    },
  },
});
export const { setGlobalData } = globalDataSlice.actions;
export const globalDataSelector = (state: RootState) =>
  state.rootReducers.globalDataReducer;
export default globalDataSlice.reducer;
