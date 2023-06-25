import Joi from 'joi';

const adminsValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(25)
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
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
    .max(25)
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
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
      'string.empty': 'DNI is not allowed to be empty',
      'string.base': 'DNI must be a number',
      'string.min': 'DNI too short',
      'string.max': 'DNI is invalid'
    }),
  phone: Joi.string()
    .regex(/^(?!.*[eE])\d+$/)
    .messages({
      'string.empty': 'Phone Number is not allowed to be empty',
      'string.base': 'Phone Number must be a number',
      'string.min': 'Phone Number is invalid',
      'string.max': 'Phone Number is invalid'
    }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.empty': 'Email is not allowed to be empty',
      'string.pattern.base': 'Email is invalid'
    }),
  city: Joi.string()
    .trim()
    .alphanum()
    .min(5)
    .max(25)
    .regex(/^[a-zA-Z0-9\s]+$/)
    .messages({
      'any.required': 'City is required',
      'string.pattern.base': 'City is invalid, only allows letters, numbers and a space',
      'string.empty': 'City is not allowed to be empty',
      'string.base': 'City must be a string',
      'string.min': 'City too short',
      'string.max': 'City is invalid'
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
    })
});

export default adminsValidation;
