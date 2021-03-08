import {GET_TAGS} from '../_action/types';

export default function(state ={}, action){
    switch(action.type){
        case GET_TAGS:
            return {...state, tagsValue: action.payload}
            break;
        default:
            return state;
    }
}