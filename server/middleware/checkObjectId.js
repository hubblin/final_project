const {Post} = require('../models/Post')
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types;

let checkObjectId = async (req,res, next) =>{
    const {id} = req.params;

    if(!ObjectId.isValid(id)){
        return res.status(400).json({success: false});        
    }
    try{
        
        Post.findById(id, (err, post)=>{
            
            if(err) return res.status(400).json({success: false , err})
            if(!post){
                return res.status(404).json({success: false });
            }
            req.post = post
            next();
        })
    }catch(e){
        
        return res.status(404).json({success: false , e});
    }
    
}

module.exports = {checkObjectId}