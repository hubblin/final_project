const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50,
    },
    email:{
        type: String,
        trim: true,
    },
    password:{
        type: String,
        minlength: 5
    },
    image: String,
})

//스키마에 붙여 사용하는데, 각각 특성은 특정 동작 이전, 이후에 어떤 행동을 취할 지를 정의할 수 있는 것(pre, post)
userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    }else{
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secretToken',{expiresIn: '7d'})

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.methods.generateToken2 = function(cb){
    const token = jwt.sign(
        {
            _id: this.id,
            name: this.name
        },
        'secretToken',
        {
            expiresIn: '7d'
        }
    )
    cb(null, token)
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    
    jwt.verify(token,'secretToken', function(err, decoded){
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}



userSchema.methods.checkPasword = async function(password){
    const result = await bcrypt.compare(paswsord, this.password);
    return result;
}

userSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.password;
    return data;
}

const User = mongoose.model('User', userSchema)

module.exports = {User}