const express=require('express')
const Post=require('../models/post');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken')

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json());


router.get("/posts", async (req,res) => {
    try{
        const post = await Post.find();
        res.status(200).json({
            status: "Success",
            post
        })
    } catch(err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

router.post("/posts", async(req,res) => {
    const {title, body, image} = req.body
    try{
        if(title && body && image) {
       const post = await Post.create({
        title: req.body.title,
        body:req.body.body,
        user:req.user
       })
    } else {
        return res.status(400).json({meassage:'details are missing'})
    }
    } catch(err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

router.put('/posts/:id',async(req,res)=>{
    try{
       const {body,title,image}= req.body
       let post=await Post.updateOne({_id: req.params.id},{$set : {body,title,image}})
       return res.status(201).json({
        messsge:'updated post',
        post
    })
    } catch(err){
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

router.delete('/posts/:id',async(req,res)=>{
    try{
        let post=await Post.deleteOne({_id:req.params.id})
        return res.status(201).json({
            message:'Successfully deleted',
            post
        })
    } catch(err){
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

module.exports= router