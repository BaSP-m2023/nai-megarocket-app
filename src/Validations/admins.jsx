import Joi from 'joi';

const adminsValidation = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .trim()
    .alphanum()
    .min(3)
    .max(25)
    .messages({
      'any.required': 'First Name is required',
      'string.empty': 'First Name is not allowed to be empty',
      'string.base': 'First Name must be a string',
      'string.min': 'First Name too short',
      'string.max': 'First Name name is invalid'
    }),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .trim()
    .alphanum()
    .min(3)
    .max(25)
    .messages({
      'string.base': 'Last Name must be a string',
      'string.min': 'Last Name must have between 3 and 25 characters',
      'string.max': 'Last Name must have between 3 and 25 characters'
    }),
  dni: Joi.number().integer().min(10000000).max(99999999).messages({
    'number.base': 'DNI must be a number',
    'number.min': 'invalid DNI',
    'number.max': 'invalid DNI'
  }),
  phone: Joi.number().integer().messages({
    'number.base': 'Phone Number must be a number',
    'number.min': 'Phone Number is invalid',
    'number.max': 'Phone Number is invalid'
  }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'Email is invalid'
    }),
  city: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .trim()
    .alphanum()
    .min(5)
    .max(25)
    .messages({
      'string.min': 'City must have between 5 and 25 characters',
      'string.max': 'City must have between 5 and 25 characters'
    }),
  password: Joi.string()
    .regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/)
    .trim()
    .min(8)
    .max(16)
    .messages({
      'string.empty': 'Password can not be empty',
      'string.min': 'Password must have between 8 and 16 characters',
      'string.max': 'Password must have between 8 and 16 characters',
      'string.pattern.base':
        'Password must contain at least 1 number, 1 uppercase letter, and 1 lowercase letter'
    })
});

export default adminsValidation;
