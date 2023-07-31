import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TAuthorizedStatus = {
  currentAuthorizedStatus: 'Authorized' | 'UnAuthorized' | 'Loading';
};
const initialState: TAuthorizedStatus = {
  currentAuthorizedStatus: 'UnAuthorized',
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<TAuthorizedStatus>) => {
      state.currentAuthorizedStatus = action.payload.currentAuthorizedStatus;
    },
  },
});
export const { setAuthStatus } = authSlice.actions;
export const authSelector = (state: RootState) =>
  state.rootReducers.authReducer;
export default authSlice.reducer;
