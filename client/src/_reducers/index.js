import {combineReducers} from 'redux';
import user from './user_reducer'
import writer from './writer_reducer'


const rootReducer = combineReducers({
    user,
    writer
})

export default rootReducer