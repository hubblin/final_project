import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../_action/user_action'
export default function(SpecificComponent, option, adminRoute = null){

    //null ==> 아무나 출입이 가능한 페이지
    //true ==> 로그인한 유저만 출입이 가능한 페이지
    //false ==> 로그인이 필요한 페이지
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {
                if(!response.payload.isAuth){
                    //로그인 하지 않은경우
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 경우
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })
        }, [])


        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck

}