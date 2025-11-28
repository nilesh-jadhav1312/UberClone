const dotenv=require('dotenv')
dotenv.config();  
// dotenv is a library that helps you read environment variables from a .env file
const express=require('express')
const cors=require('cors')
const app=express();


app.use(cors());
app.get('/',(req,res)=>{
  res.send('helo boys')
  
});

module.exports=app;