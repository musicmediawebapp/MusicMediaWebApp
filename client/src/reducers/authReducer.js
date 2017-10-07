import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // If we do not have a payload (empty) then return false
        default:
            return state;
    }
}