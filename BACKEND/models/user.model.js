const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name should be at least 3 characters"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name should be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email should be at least 5 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,       //EXCLUDE PASSWORD WHEN FETCHING USER DATA
  },
  socketId: {
    type: String,
  },
});

// Pre-save hook to hash password
userSchema.pre("save", async function() {
  // If the password hasn't changed, just exit the function (same as calling next)
  if (!this.isModified("password")) {
    return; 
  }

  this.password = await bcrypt.hash(this.password, 10);
  // No next() call needed here!
});

// Instance methods
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Static method
userSchema.statics.hashPassword = async function(password) { 
  return await bcrypt.hash(password, 10);
};

// Model for user
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;