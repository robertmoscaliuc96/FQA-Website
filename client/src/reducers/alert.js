import {SET_ALERT, REMOVE_ALERT} from '../actions/type';
const initialState = [];


export default function (state = initialState, action){

    const{type, payload} = action;

    switch(type){
        // Dispatch set alert and return the array with payload
        case SET_ALERT:
            return [...state, payload];
        // Return all alert except for the one that matches the payload
        case REMOVE_ALERT:
            return state.filter(alert=> alert.id !== payload);
        default:
            return state;
    }
}