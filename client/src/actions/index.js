import axios from 'axios';
import { FETCH_USER } from './types';

/* ACTION CREATOR ENDPOINTS */
export var fetchUser = () => {
    return async function(dispatch) {
        var res = await axios.get('/api/current_user');
        dispatch({ type : FETCH_USER, payload: res.data }); // res.data is the User model. We dispatch an action.
    };
};


/* NON-ACTION CREATOR ENDPOINTS */
/* Param1 (values): our workflowForm key under the redux-form reducer
   Param2 (history): helps navigate to /dashboard */
export var submitWorkflow = (formData, history) => {
    return async function(dispatch) {
        // Insert or update the user model to the backend
        var res = await axios.post('/api/user', formData);
        // Upon a successful workflow set up, redirect to the dashboard
        if (res.status === 200) {
            return history.push('/dashboard');            
        }
        console.log("looks like we had an error inserting/updating the user");
    }
}