import { WRITE_POST, GET_POST, FIND_POST, OWN_POST, RESET_POST , UPDATE_POST, DELETE_POST} from '../_action/types';

export default function(state={
    ownPostTitle : '',
    ownPostBody :'',
    ownPostTags : [],
    ownPostId : ''
}, action){
    switch(action.type){
        case WRITE_POST:
            return {...state, writeSuccess: action.payload}
            break;
        case GET_POST:
            return {...state, getSuccess: action.payload}
            break;
        case FIND_POST:
            return {...state, findSuccess: action.payload}
            break;

        case OWN_POST:
            return {...state, ownPostTitle: action.payload.body.title,
                ownPostBody: action.payload.body.body,
                ownPostTags: action.payload.body.tags,
                ownPostId: action.payload.body._id
            }
            break;
        case RESET_POST:
            return {...state, ownPostTitle: action.ownPostTitle,
                ownPostBody: action.ownPostBody,
                ownPostTags: action.ownPostTags,
                ownPostId: action.onwPostId
            }
            break;
        case UPDATE_POST:
            return {...state}
            break;

        case DELETE_POST:
            return {...state}
            break;
        default:
            return state;
    }
}
