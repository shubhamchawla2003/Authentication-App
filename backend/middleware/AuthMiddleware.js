const Joi = require('joi');

// for signup
const signupValidation = (req,res,next)=>{
    const Schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    })
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message : "wrong details",error})
    }
    next();
}

//for login
const loginValidation = (req,res,next)=>{
    const Schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    })
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message : "wrong details",error})
    }
    next();
}

module.exports = {signupValidation,loginValidation};
