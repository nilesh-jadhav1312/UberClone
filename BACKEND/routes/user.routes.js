const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { body } = require('express-validator');

router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid Mail id'),

    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must have at least 3 characters'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must have more than 6 characters'),
  ],
  userController.registerUser
);

module.exports = router;


 