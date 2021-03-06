import axios from 'axios'


import {
    WRITE_POST,
    GET_POST,
    FIND_POST,
    OWN_POST,
    RESET_POST,
    UPDATE_POST,
    DELETE_POST
} from './types'

export function writePost(dataToSubmit){
    const request = axios.post('/api/', dataToSubmit).then(response => response.data)
    return {
        type: WRITE_POST,
        payload : request
    }
}

export function getPost(dataToSubmit, nowpage, tags){
    const request = axios.get('/api/lists',{params: {page: nowpage, tag : tags}}, dataToSubmit).then(response => response.data)
    return {
        type: GET_POST,
        payload: request
    }
}

export function findPost(dataToSubmit, postId){
    const request = axios.get(`/api/${postId}`, dataToSubmit).then(response => response.data)
    return{
        type: FIND_POST,
        payload: request
    }
}

export function editPost(dataToSubmit, postId){
    const request = axios.get(`/api/${postId}`, dataToSubmit).then(response => response.data)
    return{
        type: OWN_POST,
        payload: request
    }
}

export function resetPost(){
    return{
        type: RESET_POST,
        ownPostTitle: '',
        ownPostBody: '',
        ownPostTags: [],
        ownPostId : ''
    }
}

export function updatePost(dataToSubmit, postId){
    const requset = axios.patch(`api/${postId}`, dataToSubmit).then(response => response.data)
    return{
        type: UPDATE_POST,
        payload: requset
    }
}

export function removePost(postId){
    const request = axios.delete(`api/${postId}`).then(response => response.data)
    return{
        type: DELETE_POST,
        payload: request
    }
}