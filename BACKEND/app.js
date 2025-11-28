const dotenv=require('dotenv')
dotenv.config();  
// dotenv is a library that helps you read environment variables from a .env file
const express=require('express')
const cors=require('cors')
const app=express();
const connectDatabase=require('./db/db')  //from db inside that from db.js

connectDatabase();

app.use(cors());
app.get('/',(req,res)=>{
  res.send('helo boys')
  
});

module.exports=app;