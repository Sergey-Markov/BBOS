import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';

const rootReducers = combineReducers({ userReducer, authReducer });

export default rootReducers;
