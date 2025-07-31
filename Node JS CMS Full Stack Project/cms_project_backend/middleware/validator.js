const {body}  = require('express-validator');

const validate =[
  body('username').matches(/^[a-zA-Z0-9_]{3,30}$/).withMessage('Invalid username format')
 .trim().withMessage('Username cannot be empty')
.notEmpty().withMessage('Username is required')
.isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
,
body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long')
.trim().withMessage('Password cannot be empty')
.notEmpty().withMessage('Password is required')
.isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

module.exports = {validate};