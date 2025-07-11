const jwt = require('jsonwebtoken');

module.exports=function(req,res,next){
const token = req.header('auth-token');
if(!token){
    return res.status(400).send('Access Denied')
}

try{
    const verified = jwt.verify(token,process.env.sec);
    req.user = verified;
    next();
}
catch(err){
    res.status(500).send('invalid token');
}
};