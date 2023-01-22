const express = require('express')
const User = require('../models/user')
const bodyParser = require('body-parser')

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body
    console.log(req.body)
    try{
    if(name && email && password)
    {
      const data=await User.create({name,email,password})
      if(data)
      {
           return res.status(200).json({
            message:"Registration Successful",
            data
         })
        }
    }
    else
    {
      return res.status(400).json({message:"All fields are mandatory"})
    }
   }
   catch(err){
       if(err.code==11000)   //error E11000 duplicate key error
       {
          return res.status(500).json({
            message:"Email already exists"
         }) 
       }
      return res.status(500).send(err)
   }
})

module.exports = router;