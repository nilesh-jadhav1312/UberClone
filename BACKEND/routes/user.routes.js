//  User Registration Route   cheking details are valid or not

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');  // reqire the user registration controller


router.post(
  '/register',    //validation for user registration
  [
    body('email')
      .isEmail()       //validate email format
      .withMessage('Invalid Mail id'),//if not true then show the custom mesage

    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must have at least 3 characters'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must have more than 6 characters'),
  ],
  userController.registerUser
);
// -----------------login route from here-------------------------

router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email id'),
  body('password').isLength({min:6}).withMessage('Password must have more than 6 characters')

], userController.loginUser)


module.exports = router;


 