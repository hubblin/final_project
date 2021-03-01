import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import AuthForm from './AuthForm';
import {withRouter} from 'react-router-dom';

import {registerUser} from '../../_action/user_action';


const RegisterFrom = (props) =>{
    const dispath = useDispatch();
    
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
    const onChange = e =>{
        const {value, name} = e.target;
        switch(name){
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'cpPassword':
                setConfirmPassword(value);
                break;
        }
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(Email === '' || Password === '' || Name === '' || ConfirmPassword === ''){
            setError('빈칸 없이 작성해 주세요');
        }else if(Password !== ConfirmPassword){
            setError("비밀번호가 다릅니다.");
        }else if(Password.length < 5){
            setError("비밀번호는 5자 이상이어야 합니다.")
        }else if(Name.length > 50){
            setError("이름은 50자 이하여야 합니다.")
        }else{
            let body = {
                email: Email,
                password: Password,
                name: Name,
            }

            dispath(registerUser(body)).then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    setError(response.payload.message)
                }
            })
        }


    }
    return (

            <AuthForm type="register" 
            onChange={onChange} 
            onSubmit={onSubmit}
            error={error}/>

    )
}

export default withRouter(RegisterFrom);