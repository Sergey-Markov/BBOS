import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducers';

const rootReducers = combineReducers({
  userReducer,
  authReducer,
  postsReducer,
});

export default rootReducers;
