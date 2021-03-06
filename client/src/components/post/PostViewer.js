import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

import PostActionButtons from '../../components/post/PostActionButton';


import {withRouter} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'
import { editPost , removePost } from '../../_action/writer_action'

const PostViewerBlock = styled(Responsive)`
    maring-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1{
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;



const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;


const PostViewer = ({history,username, publishDate, tags, body, title, postID,LoginedUser}) =>{
    const loginName = useSelector((state) => state.user.userName)
    const dispatch = useDispatch();

    const onEdit = () => {
        dispatch(editPost(null, postID)).then(response => {
            if(response.payload.success){
                history.push('/write');
            }else{
                alert('오류가 발생하였습니다.');
            }
        })
    }

    const ownPost = loginName === username;

    const onRemove = async()=>{
        dispatch(removePost(postID)).then(response =>{
            if(response.payload.success){
                history.push('/');
            }else{
                alert('오류가 발생하였습니다.');
            }
        })
    }


    return (
        <PostViewerBlock>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={username}
                    publishDate={publishDate}
                    hasMarginTop
                />
                <Tags tags={tags}/>
            </PostHead>
            {ownPost ?(
                <div>
                    <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>
                </div>
            ):(
                <div></div>
            )}
            <PostContent
                dangerouslySetInnerHTML={{__html: body}}
            />
        </PostViewerBlock>
    )
}

export default withRouter(PostViewer);