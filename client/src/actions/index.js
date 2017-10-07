import axios from 'axios';
import { FETCH_USER } from './types';

export var fetchUser = () => {
    // redux-thunk will inspect if any Action Creators return an action. 
    // If they do, it calls dispatch fucntion for the reducers.
    return async function(dispatch) {
        var res = await axios.get('/api/current_user')
        dispatch({ type : FETCH_USER, payload: res.data }); // res.data is the User model
    };
};