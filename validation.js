const joi = require('@hapi/joi');


// register validation
const RegisterValidation = (data)=>{
const schema = joi.object({

name : joi.string().min(6).required(),
email:joi.string().min(6).required().email(),
password:joi.string().min(6).required(),


});

return schema.validate(data);

}

//login validation
const LoginValidation = (data)=>{
const schema = joi.object({

email:joi.string().min(6).required().email(),
password:joi.string().min(6).required(),


});

return schema.validate(data);

}


//exports
module.exports.RegisterValidation= RegisterValidation;
module.exports.LoginValidation= LoginValidation;

