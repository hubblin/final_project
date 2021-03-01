import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AuthForm from './AuthForm';
import {withRouter} from 'react-router-dom'

import {loginUser} from '../../_action/user_action'

const LoginForm = (props) => {
    const dispath = useDispatch();

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [error, setError] = useState();

    const onChange = e =>{
        const {value, name} = e.target;
        if(name === 'email'){
            setEmail(value);
        }else if(name === 'password'){
            setPassword(value);
        }
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(Email === undefined){
            setError('아이디를 입력해 주세요');
        }else if(Password === undefined){ 
            setError('비밀번호를 입력해 주세요');
        }else{
            let body ={
                email: Email,
                password: Password
            }
            dispath(loginUser(body)).then(response =>{
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }else{
                    setError(response.payload.message);
                }
            })
        }
    }

    return (
        <AuthForm
            type="login"
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    )
}
export default withRouter(LoginForm);