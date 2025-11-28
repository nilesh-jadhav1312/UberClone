const mongoose=require('mongoose')
 

const userSchema=new mongoose.Schema({
    fullname:{
      firstname:{
           type:String,
           required:true,
           minlength:[3,'First name should be at least 3 character'],
      },
      lastname:{
           type:String,
           required:true,
           minlength:[3,'last name should be at least 3 character'],
      }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'email should be at least 3 character'],
      },
      password:{
           type:String,
           required:true,
      },
      socketId:{
        type:String,
      }
   
 })
 