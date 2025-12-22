const mongoose = require('mongoose');

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT)              //DB_CONECT is from .env file A DATABASE URL 
    .then(() => console.log('Connected to database successfully'))
    .catch((err) => console.log('Database connection error:', err));
}

module.exports = connectToDb;
