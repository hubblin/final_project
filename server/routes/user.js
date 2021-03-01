var express = require('express')
var router = express.Router();

const { User } = require('../models/User')

const {auth} = require('../middleware/auth')

const Joi = require('@hapi/joi');


router.post('/register', (req,res) => {
    //회원가입시에 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const schema = Joi.object().keys({
        name : Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required()
    })
    const result = schema.validate(req.body);
    if(result.error){
        return res.status(400).json({success: false, error})
    }
    const user = new User(req.body);

    const exists = User.findByUsername(user.name)

    if (exists) {
        return res.status(409).json({ success: false, body: "user already exist" })
    }

    
    
    user.save((err, doc) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success: true
        })
    })

})


router.post('/login', (req,res)=>{
 
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, user)=>{
        
        if(!user){
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가  맞는 

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
                return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            //토큰생성하기
            user.generateToken2((err,token)=>{
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 
                res.cookie("x_auth", token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7, //7일
                    httpOnly: true,
                })
                .status(200)
                .json({loginSuccess: true, userId: user._id}) 
            })
        })
    })
})
router.get('/logout', auth, (req,res)=>{
    const user = req.body;

    if(!user){
        return res.status(400)
    }
    return res.cookie('x_auth').status(200).json({
        success: true
    })
})

router.get('/check',auth, (req,res)=>{
    const user= req.body;
    if(!user){
        return res.status(401)
    }
    return res.status(200).json({
            body : user
        })
})



router.get('/auth',auth,(req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: true,
        isAuth: true,
        name: req.user.name,
    })
})



module.exports = router;