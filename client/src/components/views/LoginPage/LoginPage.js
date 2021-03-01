
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'

import AuthForm from '../../auth/AuthForm';
import AuthTemplate from '../../auth/AuthTemplate';
import LoginForm from '../../auth/LoginForm';

function LoginPage(props) {
    const dispath = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); //이걸 하면 기존에 form 태그를 누르면 새로고침되는 문제를 해결할 수 있다. 즉, 기존의 기능을 다 버리고 새로운 기능을 우리가 만들겠다는 의미

        let body ={
            email: Email,
            password: Password
        }

        dispath(loginUser(body)).then(response =>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            }else{
                alert("Error")
            }
        })

        
    }

    return (
        <AuthTemplate>
            <LoginForm/>
        </AuthTemplate>
    )
}

export default withRouter(LoginPage)


{/* <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width:'100%', height: '100vh'}}>
<form style={{display:'flex', flexDirection:'column'}}
    onSubmit={onSubmitHandler}
>
    <label>Email</label>
    <input type="email" value={Email} onChange={onEmailHandler}/>
    <label>Password</label>
    <input type="password" value={Password} onChange={onPasswordHandler}/>
    <br/>
    <button type="submit">Login</button>
</form>
</div> */}