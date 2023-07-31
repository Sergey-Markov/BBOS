import { RootState } from '../../store';

export const getAuthStatus = (state: RootState) =>
  state.rootReducers.authReducer.currentAuthorizedStatus;
