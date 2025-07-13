const User = require("../Models/User");
const bcrypt = require('bcrypt');//isko baad me try krna hai abhi nhi chal rha 
const jwt = require('jsonwebtoken');

const signup = async (req,res) => {
    try{

        const {name, email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({
                message : " user is already exist", success : false
            })
        }

        const userModel = new User({name,email,password});
        //userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({
            message : "signup successfully",
            success : true
        })

    }catch(e){
        console.log(e);  
        res.status(500).json({
            message : "internal server error",
            success : false
        })    
    }
}


//for login
const login = async (req,res) => {
    try{

        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({
                message : "email or password is wrong", success : false
            })
        }

        //const isPasswordEqual = await bcrypt.compare(password,user.password);
        /*if(!isPasswordEqual){
            return res.status(403).json({
                message : "email or password is wrong", success : false
            })
        }*/

            if(password != user.password){
                 return res.status(403).json({
                message : "email or password is wrong", success : false
            })
            }

        const jwtTokan = jwt.sign({email:user.email,_id : user._id},process.env.JWT_SECRET,{expiresIn : '48h'})
        res.status(200).json({
            message : "login successfully",
            success : true,
            jwtTokan,
            email,
            name : user.name
        })

    }catch(e){
        console.log(e);  
        res.status(500).json({
            message : "internal server error",
            success : false
        })    
    }
}

module.exports = {signup,login};