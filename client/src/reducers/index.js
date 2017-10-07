import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Once an action is dispatched, it goes to ALL of the reducers checking the action TYPE
export default combineReducers({
    auth: authReducer
});