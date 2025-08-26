const { validationResult, body } = require('express-validator');

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Please check your input',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }

  next();
};




// Validation rules for user login
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors
];

// Validation rules for store creation
const validateStore = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Store name must be between 2 and 100 characters'),

  body('category')
    .isIn([
      'Electronics', 'Grocery', 'Clothing', 'Home & Garden', 'Sports',
      'Books', 'Automotive', 'Health & Beauty', 'Jewelry', 'Toys', 'Other'
    ])
    .withMessage('Please select a valid category'),

  body('address.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),

  body('address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),

  body('address.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),

  body('address.zipCode')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required'),

  body('coordinates.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  body('coordinates.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  handleValidationErrors
];

// Validation rules for rating submission
const validateRating = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('review')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Review cannot exceed 1000 characters'),

  body('storeId')
    .isMongoId()
    .withMessage('Invalid store ID'),

  handleValidationErrors
];

// Validation rules for user profile update
const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  handleValidationErrors
];

module.exports = {
  handleValidationErrors,

  validateLogin,
  validateStore,
  validateRating,
  validateProfileUpdate
};
