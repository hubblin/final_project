const { User } = require('../models/User')
const jwt = require('jsonwebtoken');
const { isRef } = require('@hapi/joi');
let auth = async (req,res,next) =>{
    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가지고 온다.
    let token = req.cookies.x_auth;

    //토큰을 복호화 한후 유저를 찾는다.
    // User.findByToken(token, (err, user)=>{
    //     if(err) throw err;
    //     if(!user) return res.json({isAuth: false, error: true})

    //     req.token = token;
    //     req.user= user;
    //     next();
    // })
    if(!token) return res.json({isAuth: false, error: true});
    try{
        const decode = jwt.verify(token, 'secretToken');

        User.findById(decode._id, (err, user)=>{
            if(err) return res.json({isAuth:false, err})
            req.user = user;
            next();
        })
    }catch(e){
        return res.json({isAuth: false, error: true})
    }

    //유저가 있으면 인증
    //유저가 없으면 인증거부
}

module.exports ={auth};