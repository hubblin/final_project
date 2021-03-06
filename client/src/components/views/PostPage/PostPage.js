import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';

import {findPost} from '../../../_action/writer_action';

import PostViewr from '../../post/PostViewer'

import HeaderContainer from '../../common/HeaderContainer'



const PostPage = (props) => {
    const dispatch = useDispatch();

    
    

    const [Title, setTitle] = useState('');
    const [Body, setBody] = useState('');
    const [Tags, setTags] = useState([]);
    const [Time, setTime] = useState('');
    const [username, setUsername] = useState('');

    useEffect(()=>{
        dispatch(findPost(null,props.match.params.postId)).then(response =>{
            if(response.payload.success){
                setBody(response.payload.body.body);
                setTitle(response.payload.body.title);
                setTags(response.payload.body.tags);
                setTime(response.payload.body.publishedDate);
                setUsername(response.payload.body.user.name);
            }
        })
    },[])


    return (
        <div>
            
            <HeaderContainer/>
            <PostViewr username={username} publishDate={Time} tags={Tags} body={Body} title={Title}
                postID={props.match.params.postId} 
            />
        </div>
    );
};

export default React.memo(withRouter(PostPage));