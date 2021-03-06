var express = require('express')
var router = express.Router();

const { Post } = require('../models/Post')

const { checkObjectId } = require('../middleware/checkObjectId')

const Joi = require('@hapi/joi');

const {auth} = require('../middleware/auth')

//get == read all 
router.get('/', function (req, res) {

    Post.find({}, (err, doc) => {
        if (err) return res.status(404).json({ success: false, err })
        return res.status(200).json({
            success: true,
            doc
        })
    });

})

//page list get 페이지를 올려줘야 한다.
//get api/lists?page=&name=&tag=
router.get('/lists', function(req, res){
    const page = parseInt(req.query.page || '1', 10);
    if(page < 1){
        return res.status(400);
    }
    const {tag, name} = req.query;
    if(!tag){

    }else{
        parsedTag = tag.split(',');
    }
    

    const query = {
        ...(name ? {'user.name' : name} : {}),
        ...(tag ? {tags : { $all : parsedTag}} : {})
    }



    Post.find(query).sort({_id: -1}).limit(10).skip((page - 1) * 10).exec(function(err, doc){
        if (err) return res.status(404).json({ success: false, err })
        Post.countDocuments(query).exec(function(err2, lastPage){
            if (err2) return res.status(404).json({ success: false, err2 })
            return res.status(200).json({
                success: true,
                Last_Page: Math.ceil(lastPage / 10),
                data: doc.map(post => post.toJSON()).map(post => ({...post, body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`}))
            })
        });

    })
})

//get == read findOne and display
router.get('/:id', checkObjectId, function (req, res) {
    const body = req.post;
    res.status(200).json({
        success: true,
        body
    })
})

//delete == delete
router.delete('/:id',auth, checkObjectId, function (req, res) {
    const { id } = req.params;
    Post.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(404).json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

//patch == update
router.patch('/:id', auth,checkObjectId, function (req, res) {
    const { id } = req.params;

    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string())
    })

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            success: false,
            result: result.error
        })
    }

    Post.findByIdAndUpdate(id, req.body, (err, doc) => {
        if (err) return res.status(404).json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


router.post('/',auth, (req, res) => {

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()
    })

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            success: false,
            result: result.error
        })

    }

    const { title, body, tags} = req.body;

    const post = new Post({
        title,
        body,
        tags,
        user: req.user
    });
    post.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})



module.exports = router;