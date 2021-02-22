var express = require('express')
var router = express.Router();

const { User } = require('../models/User')

const {auth} = require('../middleware/auth')


router.post('/register', (req,res) => {
    //회원가입시에 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body);

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
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id}) 
            })
        })
    })

})


router.post('/auth',auth,(req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image : req.user.image
    })
})

router.get('/logout', auth, (req,res)=>{
    User.findOneAndUpdate({_id: req.user._id},{
        token: ""
    }, (err, user)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

module.exports = router;