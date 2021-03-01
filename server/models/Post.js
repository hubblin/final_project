const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: String,
    body : String,
    tags: [String],
    publishedDate:{
        type: Date,
        default: Date.now
    },
    user:{
        _id: mongoose.Types.ObjectId,
        name: String
    }
})

const Post = mongoose.model('Post', PostSchema);
module.exports = {Post}