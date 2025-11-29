const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  // Use the model's pre-save hook to hash passwords. Don't call a
  // non-existent helper on the model.
  try {
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password, // plain password — will be hashed by the model pre-save
    });

    // remove password from the user object before returning
    const userObj = user.toObject ? user.toObject() : user;
    if (userObj.password) delete userObj.password;

    const token = user.generateAuthToken();
    return res.status(201).json({ token, user: userObj });
  } catch (err) {
    // Mongo duplicate key (email already exists)
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error("Register user error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
