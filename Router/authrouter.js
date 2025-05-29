const express = require('express');
const Router  = express.Router();
const user = require ('../model/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {RegisterValidation,LoginValidation} = require('../validation.js');



Router.post('/register',async(req,res)=>{

    const {error} = RegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

//checing if user exist
const UserExists = await user.findOne({email:req.body.email});
if(UserExists){
  return res.status(400).send("user already exists")
}

//hashing password
const salt = await bcrypt.genSalt(10);
const HashedPassword= await bcrypt.hash(req.body.password,salt);

    const user1= new user({
        name:req.body.name,
        email:req.body.email,
        password:HashedPassword,
    }
    
    )
    try{
        const saveduser1 = await user1.save();
        res.json({user1: user1._id});
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
})


//login
Router.post('/login',async(req,res)=>{
      const {error} = LoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
const User = await user.findOne({email:req.body.email});
if(!User){
  return res.status(400).send("user wrong")
}
const validpass = await bcrypt.compare(req.body.password,User.password);

if(!validpass){return res.status(400).send('wrong password')};
const token = jwt.sign ({_id:user._id},process.env.sec)
res.header('auth-token',token).send(token);


})


module.exports=Router;