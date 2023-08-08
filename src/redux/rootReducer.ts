import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducers';
import newsReducer from './reducers/newsReducer';

const rootReducers = combineReducers({
  userReducer,
  authReducer,
  postsReducer,
  newsReducer,
});

export default rootReducers;
