import React,{useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Header from '../../components/common/Header'
import {auth} from '../../_action/user_action'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
const HeaderContainer = (props) =>{
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const dispath = useDispatch();
    useEffect(()=>{
        dispath(auth()).then(response =>{
            if(!response.payload.isAuth){
                setisLoggedIn(false)
            }else{
                setisLoggedIn(true);
                setUserName(response.payload.name)
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
    return <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={onLogoutHandler}/>
};

export default withRouter(HeaderContainer);