import axios from 'axios';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'

import AuthForm from '../../auth/AuthForm';
import AuthTemplate from '../../auth/AuthTemplate';

function RegisterPage(props) {

    const dispath = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); //이걸 하면 기존에 form 태그를 누르면 새로고침되는 문제를 해결할 수 있다. 즉, 기존의 기능을 다 버리고 새로운 기능을 우리가 만들겠다는 의미

        if(Password !== ConfirmPassword){
            return alert("비밀번호가 다릅니다.")
        }

        let body ={
            email: Email,
            password: Password,
            name: Name,
        }

        

        dispath(registerUser(body)).then(response =>{
            if(response.payload.success){
                props.history.push('/login')
            }else{
                alert("Failed to sign up")
            }
        })

        
    }
    return (
        <AuthTemplate>
            <AuthForm type="register"/>
        </AuthTemplate>
    )
}

export default withRouter(RegisterPage)

{/* <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width:'100%', height: '100vh'}}>
<form style={{display:'flex', flexDirection:'column'}}
    onSubmit={onSubmitHandler}
>
    <label>Email</label>
    <input type="email" value={Email} onChange={onEmailHandler}/>
    <label>name</label>
    <input type="text" value={Name} onChange={onNameHandler}/>
    <label>Password</label>
    <input type="password" value={Password} onChange={onPasswordHandler}/>
    <label>Confirm Password</label>
    <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
    <br/>
    <button type="submit">회원가입</button>
</form>
</div> */}