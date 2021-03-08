import React from 'react'

import {withRouter} from 'react-router-dom';

import {getTags} from '../../../_action/search_action'

import {useDispatch} from 'react-redux';

import HeaderContainer from '../../common/HeaderContainer'
import PostListContainer from '../../post/PostListContainer';
import Draw from '../../post/Draw';

function LandingPage(props) {
    const dispatch = useDispatch();

    const onCheck = (res) =>{
        dispatch(getTags(res))
    }
    return (
        <div >
            <HeaderContainer/>

            <Draw func={onCheck}/>
            <PostListContainer page={props.location.search}/>

            
        </div>
    )
}

export default withRouter(LandingPage)