const Router = require('express').Router();
const verify=require('./verified.js');
Router.get('/',verify,(req,res)=>{
    res.json({
        post:{
            title:'aldfkjld',description:'hmmm'
        }
    })
})
module.exports=Router;