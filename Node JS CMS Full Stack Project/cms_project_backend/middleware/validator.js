const {body}  = require('express-validator');

const LoginValidator =[
  body('username').matches(/^[a-zA-Z0-9_]{3,30}$/).withMessage('Invalid username format')
 .trim().withMessage('Username cannot be empty')
.notEmpty().withMessage('Username is required')
.isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
,
body('password')
.trim()
.notEmpty().withMessage('Password is required')
.isLength({ min: 3 ,max:8 }).withMessage('Password must be at least 8 characters long')
];

const userValidator = [
  body('fullname')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 3, max: 30 }).withMessage('Full name must be between 3 and 30 characters long'),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 3, max: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^[a-zA-Z0-9_]{3,30}$/).withMessage('Invalid password format'),
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isIn(['admin', 'author']).withMessage('Role must be either admin or author')
];
const updateUserValidator = [
  
    body('fullname').notEmpty().withMessage('Full name is required')
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('Full name must be between 3 and 30 characters long'),
   body('password')
  .trim()
  .optional({ checkFalsy: true }) // will treat '' or null as "not provided"
  .isLength({ min: 3, max: 8 }).withMessage('Password must be 3–8 characters')
  .matches(/^[a-zA-Z0-9_]+$/).withMessage('Password must contain only letters, numbers, or underscores')
,
    body('role').optional().trim()
    .isIn(['admin', 'author']).withMessage('Role must be either admin or author')
    
];


const categoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 30 }).withMessage('Category name must be between 3 and 30 characters long'),
    body('description').optional({checkFalsy:true}).trim().isLength({ min: 3, max: 100 }).withMessage('Description must be between 3 and 100 characters long')
    .isString().withMessage('Description must be a string'),
  body('slug').notEmpty().trim()
]

const updateCategoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 30 }).withMessage('Category name must be between 3 and 30 characters long'),
    body('description').optional({checkFalsy:true}).trim().isLength({ min: 3, max: 100 }).withMessage('Description must be between 3 and 100 characters long')
    .isString().withMessage('Description must be a string')
];

const articalValidator = [
  body('title').notEmpty().withMessage('Title is required')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters long'),
  body('content').notEmpty().withMessage('Content is required').trim()
    .isLength({ min: 3, max: 5000 }).withMessage('Content must be between 3 and 5000 characters long'),
  body('category').notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  
];

;


module.exports = {
  LoginValidator,
  categoryValidator,
  updateCategoryValidator,
  articalValidator,
  
  userValidator,
  updateUserValidator
};
