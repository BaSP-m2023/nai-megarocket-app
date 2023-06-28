import Joi from 'joi';

const memberValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .max(25)
    .messages({
      'any.required': 'First Name is required',
      'string.pattern.base': 'First Name is invalid, only letters and a space are allowed',
      'string.empty': 'First Name is not allowed to be empty',
      'string.base': 'First Name must be a string',
      'string.min': 'First Name too short',
      'string.max': 'First Name is invalid'
    }),
  lastName: Joi.string()
    .trim()
    .min(3)
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .max(25)
    .messages({
      'any.required': 'Last Name is required',
      'string.pattern.base': 'Last Name is invalid, only letters and a space are allowed',
      'string.empty': 'Last Name is not allowed to be empty',
      'string.base': 'Last Name must be a string',
      'string.min': 'Last Name too short',
      'string.max': 'Last Name is invalid'
    }),
  dni: Joi.string()
    .trim()
    .min(7)
    .max(8)
    .regex(/^(?!.*[eE])\d+$/)

    .messages({
      'string.empty': 'DNI is required',
      'string.base': 'DNI must be a number',
      'string.min': 'DNI too short',
      'string.max': 'DNI is invalid'
    }),
  phone: Joi.string()
    .regex(/^\d{10}$/)
    .messages({
      'string.empty': 'Phone Number is required',
      'string.pattern.base': 'Phone Number must be a 10-digit number',
      'string.base': 'Phone Number must be a string'
    }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'The email is invalid',
      'string.empty': 'Email cannot be empty'
    }),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
    .label('Password')
    .messages({
      'string.pattern.base':
        'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.'
    }),
  city: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .min(5)
    .max(25)
    .messages({
      'string.min': 'City must have between 5 and 25 characters',
      'string.max': 'City must have between 5 and 25 characters',
      'string.empty': 'City is required.'
    }),
  birthDay: Joi.date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString())
    .messages({
      'date.max': 'You must have at least 16 years',
      'any.required': 'Date cannot be empty'
    }),
  postalCode: Joi.number().integer().min(1000).max(99999).messages({
    'number.max': 'Postal code cannot have more than 5 numbers',
    'number.min': 'Postal code cannot have less than 4 numbers',
    'any.required': 'Postal code is required',
    'number.empty': 'Postal code cannot be empty'
  }),
  isActive: Joi.boolean(),
  membership: Joi.string().valid('Black', 'Gold', 'Silver').messages({
    'string.valid': 'Please enter a valid membership: Black, Gold or Silver',
    'any.required': 'Membership is required.',
    'string.empty': 'Membership cannot be empty'
  })
});

export default memberValidation;
