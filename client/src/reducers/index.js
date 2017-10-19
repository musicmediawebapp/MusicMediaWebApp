import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; // This reducer belongs to the redux-form library
import authReducer from './authReducer';

// Once an action is dispatched, it goes to ALL of the reducers checking the action TYPE
// And returning it. combineReducers next combines these into a single state object that can
// be accessed by the key (i.e auth, form)
export default combineReducers({
    // These will be under the "state" object in the components (maintained by redux). i.e state.auth
    auth: authReducer,
    form: reduxForm
});