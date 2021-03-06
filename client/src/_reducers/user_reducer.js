import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_action/types";



export default function(state ={}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return {...state, register: action.payload}
            break;

        case AUTH_USER:
            return { ...state, userName: action.payload.name }
            break;
        default:
            return state;
    }
}