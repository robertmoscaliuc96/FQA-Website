import {
     REGISTER_SUCCESS,
     REGISTER_FAIL
} from '../actions/type';

const initialState = {
    token: localStorage.getItem('token'),
    // When make a successful request to register or log in it will be set true
    isAuthenticated: null,
    // Make sure that the loading is done
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            // if it is a fail remove the token
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;

    }


}