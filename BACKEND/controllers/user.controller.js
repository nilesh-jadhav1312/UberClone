//  User Registration Controller 

const userModel = require("../models/user.model");
const userService = require("../services/user.service");//creating new user

const { validationResult } = require("express-validator");  //is a function used to extract and collect all the validation errors from a request after your validation rules have run

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword =await userModel.hashPassword(password);   //getting hash password 
 
          const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password, // plain password — will be hashed by the model pre-save
          });

          const token = user.generateAuthToken();
          res.status(201).json({ token, user});
};


//===================login controller from here========================//

module.exports.loginUser=async(req,res,next)=>{
  //next → A function used to pass control to the next middleware (for error handling or other processing).
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array})     //errors.array() converts the errors into an array of error messages.
  } 

  const {email,password}=req.body;                                //Destructuring req.body to extract email and password.

  const user=await userModel.findOne({email}).select('+password'); 
    //await:Waits for the database query to finish. This is why the function was async.
  if(!user)
  {
    return res.status(401).json({message:'Invalid email '})
  }

  const isPasswordValid=await user.comparePassword(password);
   if(!isPasswordValid)
  {
    return res.status(401).json({message:'Invalid  password'})
  }

  const token=user.generateAuthToken();  //generating token after user login too say that the user is authenticated everywhere you can use thistoken
   res.cookie('token',token);
  res.status(200).json({token,user})
}

module.exports.getUserProfile=async(req,res,next)=>{
  res.status(200).json(req.user);
}