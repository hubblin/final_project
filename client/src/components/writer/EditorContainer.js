import React, {useEffect, useCallback, useState} from 'react';
import Editor from '../../components/writer/Editor';
import TagBox from '../../components/writer/TagBox';
import WriteActionButtons from '../../components/writer/WriteActionButton';
import {useSelector, useDispatch} from 'react-redux';

import {withRouter} from 'react-router-dom';

import {writePost , updatePost} from '../../_action/writer_action'


const EditorContainer = (props) =>{
    const dispatch = useDispatch();
    const {postTitle, postBody, postTags, postId } = useSelector((state)=> ({
        postTitle : state.writer.ownPostTitle,
        postBody: state.writer.ownPostBody,
        postTags : state.writer.ownPostTags,
        postId : state.writer.ownPostId
    }))

    useEffect(()=>{
        if(postTitle && postBody && postTags && postId){
            setTitle(postTitle);
            setBody(postBody);
            setTags(postTags);
        }
    },[])

    const [Title, setTitle] = useState("");
    const [Body, setBody] = useState("");
    const [Tags, setTags] = useState([]);

    let checkId = false;
    if(postId === undefined){
        checkId = false
    }else{
        checkId = true
    }


    const onChange = e =>{
        const {value, name} = e.target;
        switch(name){
            case 'title':
                setTitle(value)
                break;

        }
    }

    const onChangeHtml = html => {
        setBody(html);
    }



    const onChangeTags = nextTags =>{
        setTags(nextTags);
    }


    const onCancel = () => {
        props.history.goBack();
    }

    const onPublish = () => {
        let bodys = {
            title: Title,
            body : Body,
            tags : Tags
        }
        if(postId !== undefined){
            dispatch(updatePost(bodys, postId)).then(response =>{
                if(response.payload.success){
                    props.history.push(`/${postId}`)
                }else{
                    alert('실패')
                }
            })
        }else{
            dispatch(writePost(bodys)).then(response => {
                if (response.payload.success) {
                    props.history.push('/')
                } else {
                    alert('실패')
                }
            })
        }


    }


 
    return (
        <div>
            <Editor
                onChange={onChange}
                onChangeHtml={onChangeHtml}
                theTitle={Title}
                theBody={Body}
            />
            <TagBox
                theTags={Tags}
                onChangeTags={onChangeTags}
            />
            <WriteActionButtons onCancel={onCancel} onPublish={onPublish} isEdit={checkId}/>
            
        </div>
    )
}
export default withRouter(EditorContainer);