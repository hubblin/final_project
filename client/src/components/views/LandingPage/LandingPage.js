import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(()=>{
        axios.get('/').then(response => console.log(response))
    }, [])
    return (
        <div>
            dkdkdkdk
        </div>
    )
}

export default LandingPage
