const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50,
    },
    email:{
        type: String,
        trim: true,
    },
    lastname:{
        type: String,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}