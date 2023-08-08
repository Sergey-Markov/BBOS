import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducers';
import newsReducer from './reducers/newsReducer';
import eventsReducer from './reducers/eventsReducer';

const rootReducers = combineReducers({
  userReducer,
  authReducer,
  postsReducer,
  newsReducer,
  eventsReducer,
});

export default rootReducers;
