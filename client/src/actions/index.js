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
        // User finished the workflow set up, so set the flag to true
        formData.isProfileSetUp = true;
        // Insert or update the user model to the backend
        try {
            var res = await axios.post('/api/user', formData);
            if (res.status === 200 && formData.formType === "workflow") {
                return history.push({
                    pathname: '/dashboard',
                    state: { finishedWorkflow: true }
                });     
            }
        } catch (err) {
            return history.push('/error');
        }
    }
}