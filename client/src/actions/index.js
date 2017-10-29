import axios from 'axios';
import { FETCH_USER } from './types';

/* ACTION CREATOR ENDPOINTS */
export var fetchUser = () => {
    return async function(dispatch) {
        var res = await axios.get('/api/current_user');
        dispatch({ type : FETCH_USER, payload: res.data }); // res.data is the User model. We dispatch an action.
    };
};


/* Param1 (formData): the value of the key under the redux-form reducer
   Param2 (history): helps navigation */
export var submitWorkflow = (formData, history) => {

    return async function(dispatch) {
        // If we're in the workflow and the user finished the workflow set up, set the flag to true
        if (formData.formType === "workflow") { formData.isProfileSetUp = true; }

        // Insert or update the user model to the backend
        try {
            var res = await axios.post('/api/user', formData);
            if (res.status === 200 && formData.formType === "workflow") {
                return history.push({
                    pathname: '/dashboard',
                    state: { finishedWorkflow: true }
                });     
            }
            else if (res.status === 200 && formData.formType === "profile") {
                return "Success";
            }
        } catch (err) {
            return history.push('/error');
        }
    }
}