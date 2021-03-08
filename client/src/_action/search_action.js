import {
    GET_TAGS
} from './types'

export function getTags(dataToSubmit){
    return {
        type: GET_TAGS,
        payload: dataToSubmit
    }
}