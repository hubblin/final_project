import {combineReducers} from 'redux';
import user from './user_reducer'
import writer from './writer_reducer'
import search from './search_reducer'


const rootReducer = combineReducers({
    user,
    writer,
    search
})

export default rootReducer