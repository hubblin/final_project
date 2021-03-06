import React,{useEffect} from 'react'

import {withRouter} from 'react-router-dom';



import HeaderContainer from '../../common/HeaderContainer'
import PostListContainer from '../../post/PostListContainer';


function LandingPage(props) {
    return (
        <div >
            <HeaderContainer/>


            <PostListContainer page={props.location.search}/>

            
        </div>
    )
}

export default withRouter(LandingPage)