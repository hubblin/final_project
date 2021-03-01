import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AuthForm from './AuthForm';

const LoginForm = () => {
    const dispatch = useDispatch();
    const onChange = e =>{
        const {value, name} = e.target;
        console.log(e.target.value)
    }

    return (
        <AuthForm
            type="login"
            onChange={onChange}
        />
    )
}
export default LoginForm;