import React, {useEffect, useState} from 'react'

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NavBar.css';

import {useDispatch} from 'react-redux'
import {auth} from '../../../_action/user_action'
import axios from 'axios';

import {withRouter} from 'react-router-dom';

//null ==> 아무나 출입이 가능한 페이지
//true ==> 로그인한 유저만 출입이 가능한 페이지
//false ==> 로그인이 필요한 페이지
function NotLoggedIn(props){
    return (
        <div>
            <Button variant="default" className="myButton" href="/register">회원가입</Button>
            <Button variant="default" className="myButton" href="/login">로그인</Button>
        </div>
    )
}


function NavBar(props) {

    const [isLoggedIn, setisLoggedIn] = useState(false);

    const dispath = useDispatch();
    useEffect(()=>{
        dispath(auth()).then(response =>{
            //로그인하지 않은 경우
            if(!response.payload.isAuth){
                setisLoggedIn(false)
            }else{
                //로그인 한 경우
                setisLoggedIn(true)
            }
        })
    })

    const onLogoutHandler = () => {
        axios.get('/api/users/logout').then(response =>{
            if(response.data.success){
                props.history.push('/')
            }else{
                alert('로그아웃에 실패했습니다.')
            }
        })
    }
    

    return (
        <div>
            <Navbar className='colorNav' expand="lg">
                <Navbar.Brand href="/">
                    <div className="textcolorNav">The Final Project</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        
                    </Nav>
                    <Nav>
                        <div>
                            {isLoggedIn ? (
                                <Button variant="default" className="myButton" onClick={onLogoutHandler}>로그아웃</Button>
                            ):(
                                <NotLoggedIn/>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(NavBar)

