import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

import {Link, withRouter} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {resetPost } from '../../_action/writer_action';

const PostLinkBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    &:fisrt-child {
        padding-top: 0;
    }
    &+&{
        border-top: 1px solid ${palette.gray[2]};
    }

    h2{
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }

    p{
        margin-top: 2rem;
    }
`;


const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;


const PostItem = ({post}) =>{
    const {publishedDate, user, tags, title, body, _id} = post;
    return(
        <PostItemBlock>
                <h2>
                    <Link to={`/${_id}`}>{title}</Link>
                </h2>
                <SubInfo username={user.name} publishedDate={new Date(publishedDate)}/>
                <Tags tags={tags}/>
                <PostContent
                    dangerouslySetInnerHTML={{__html: body}}
                />
        </PostItemBlock>
    )
}

const PostList = ({posts, history})=>{
    const dispatch = useDispatch();
    
    const loginName = useSelector((state) => state.user.userName);

    const onClick = () => {
        dispatch(resetPost())
        history.push('/write')
    }

    
    
    return (
        <PostLinkBlock>
            <WritePostButtonWrapper>
                {loginName ? (
                    <Button cyan onClick={onClick}>
                        새 글 작성하기
                    </Button>
                ):(
                    <div></div>
                )}

            </WritePostButtonWrapper>
            <div>
                {posts.map(post=>(
                    <PostItem post={post} key={post._id}/>
                ))}
                
            </div>
        </PostLinkBlock>
    )
}
export default withRouter(PostList);