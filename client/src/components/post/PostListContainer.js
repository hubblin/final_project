import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PostList from '../../components/post/PostList';

import {getPost} from '../../_action/writer_action';

import Pagination from './Pagination';
import SearchBox from './Search';

import queryString from 'query-string'

import {withRouter} from 'react-router-dom';

import Draw from './Draw';

const PostListContainer = ({page, history}) =>{
    const dispatch = useDispatch();
    const queryObj = queryString.parse(page);
    let currentPage;
    let currentTag;
    //만약 페이지가 있다면 그 페이지로 가고 없다면 1페이지로 설정
    if(!queryObj.page){
        currentPage = 1;
    }else{
        currentPage = Number(queryObj.page)
    }
    //만약 태그가 있다면 태그를 설정
    if(queryObj.tag){
        currentTag = queryObj.tag
    }
    
    //포스트 정보를 가지고 있기 위한 state
    const [Posts, setPosts] = useState([]);
    //마지막 페이지 정보를 가지고 있기 위한 state
    const [LastPage, setLastPage] = useState();
    //검색한 정보를 핸들링 하기 위한 state
    const [Version, setVersion] = useState('searchTag');
    const [Search, setSearch] = useState('');

    

    useEffect(()=>{
        dispatch(getPost(null,currentPage,currentTag)).then(response =>{
            if(response.payload.success){
                setPosts(response.payload.data)
                setLastPage(response.payload.Last_Page)
            }
        })
    },[currentPage, currentTag])


    const onChange = e =>{
        const {value, name} = e.target;
        switch(name){
            case 'type':
                setVersion(value);
                break;
            case 'search':
                setSearch(value);
                break;
        }
    }

    const onSearch = () => {

        if(Version === 'searchTag'){

            history.push(`/?tag=${Search}`)
        }else if(Version === 'searchUser'){
            history.push()
        }
    }



    return(
        <div>
            <Draw/>
            <SearchBox onChange={onChange} onSearch={onSearch}/>
            <PostList posts={Posts}/>
            <Pagination page={currentPage} lastPage={LastPage}/>
        </div>
    )
}

export default withRouter(PostListContainer);