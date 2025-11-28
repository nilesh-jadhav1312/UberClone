const mongoose = require('mongoose');

function connectDatabase() {
  mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to databse successfully'))
  .catch(err => console.log('MongoDB connection error:', err));
}

module.exports = connectDatabase;
