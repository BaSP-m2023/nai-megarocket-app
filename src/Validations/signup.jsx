import Joi from 'joi';

const memberValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]*$/)
    .min(3)
    .max(25)
    .messages({
      'any.required': 'Name is required',
      'string.pattern.base': 'Name is invalid, only letters and a space are allowed',
      'string.empty': 'Name is required',
      'string.base': 'Name must be a string',
      'string.min': 'Name too short',
      'string.max': 'Name is invalid'
    }),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]*$/)
    .min(3)
    .max(25)
    .messages({
      'any.required': 'Last Name is required',
      'string.pattern.base': 'Last Name is invalid, only letters and a space are allowed',
      'string.empty': 'Last Name is required',
      'string.base': 'Last Name must be a string',
      'string.min': 'Last Name too short',
      'string.max': 'Last Name is invalid'
    }),
  dni: Joi.number().integer().min(1000000).max(99999999).messages({
    'number.base': 'DNI is required',
    'number.empty': 'DNI is required',
    'number.min': 'DNI too short',
    'number.max': 'DNI must be a 7-8 digit number'
  }),
  phone: Joi.number().integer().min(1000000000).max(9999999999).messages({
    'number.base': 'Phone is required',
    'number.empty': 'Phone is required',
    'number.min': 'Phone Number must be a 10-digit number',
    'number.max': 'Phone Number must be a 10-digit number',
    'any.required': 'Phone Number is required'
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
      'string.pattern.base': 'Invalid password: Example1!',
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
  })
});

export default memberValidation;
