const userModel =require('../models/user.model');
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');  //by using token we are geting which user is loged in 

module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1]; // getting token from res
    if(!token)
    { 
        return res.status(401).json({message:'Unauthorized User'});
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decode._id)
        req.user=user;
        return next();
    }
    catch(err)
    {
        return res.status(401).json({message:'Unauthorizes User'});
    }
}