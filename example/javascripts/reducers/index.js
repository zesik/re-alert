import { combineReducers } from 'redux';
import example from './example';
import { notificationReducer } from '../../..';

const rootReducer = combineReducers({
  example,
  notification: notificationReducer
});

export default rootReducer;
