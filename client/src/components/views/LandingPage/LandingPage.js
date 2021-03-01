import React,{useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import NavBar from '../Navbar/NavBar'

import Button from '../../common/Button'

import HeaderContainer from '../../common/HeaderContainer'

function LandingPage(props) {

    useEffect(()=>{
        axios.get('/api/').then(response => console.log(response))
    }, [])


    return (
        <div >
            <HeaderContainer/>

            <h2>시작 페이지</h2>

        </div>
    )
}

export default withRouter(LandingPage)