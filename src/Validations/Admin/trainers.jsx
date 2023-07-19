import Joi from 'joi';

export const trainerCreateValidation = Joi.object({
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
    'number.max': 'DNI must be a 7-8 digit number',
    'number.integer': 'DNI must be an integer'
  }),
  phone: Joi.number().integer().min(1000000000).max(9999999999).messages({
    'number.base': 'Phone is required',
    'number.empty': 'Phone is required',
    'number.min': 'Phone Number must be a 10-digit number',
    'number.max': 'Phone Number must be a 10-digit number',
    'any.required': 'Phone Number is required',
    'number.integer': 'Phone must be an integer'
  }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'Email is invalid',
      'string.empty': 'Email is required'
    }),
  city: Joi.string()
    .trim()
    .min(3)
    .regex(/^[a-zA-Z0-9]+\s?[a-zA-Z0-9]+$/)
    .max(25)
    .messages({
      'any.required': 'City is required',
      'string.pattern.base': 'City is invalid, only allows letters, numbers and a space',
      'string.empty': 'City is required',
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
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.',
      'string.min': 'Password must have at least 8 characters',
      'string.max': 'Password must have less than 16 characters',
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    }),
  salary: Joi.number().min(10).max(100).required().messages({
    'any.required': 'Salary is required',
    'number.min': 'Salary can not be less than 10',
    'number.base': 'Salary is required',
    'number.max': 'Salary can not be more than 100'
  }),
  isActive: Joi.boolean()
});

export const trainerUpdateValidation = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .trim()
    .min(3)
    .max(25)
    .required()
    .messages({
      'string.pattern.base': 'Name must have only letters',
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .trim()
    .min(3)
    .max(25)
    .required()
    .messages({
      'string.pattern.base': 'Last name must have only letters',
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required.'
    }),
  dni: Joi.number().integer().min(1000000).max(99999999).messages({
    'number.base': 'DNI is required',
    'number.empty': 'DNI is required',
    'number.min': 'DNI too short',
    'number.max': 'DNI must be a 7-8 digit number',
    'number.integer': 'DNI must be an integer'
  }),
  phone: Joi.number().integer().min(1000000000).max(9999999999).messages({
    'number.base': 'Phone is required',
    'number.empty': 'Phone is required',
    'number.min': 'Phone Number must be a 10-digit number',
    'number.max': 'Phone Number must be a 10-digit number',
    'any.required': 'Phone Number is required',
    'number.integer': 'Phone must be an integer'
  }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': 'The email is invalid'
    }),
  city: Joi.string()
    .trim()
    .regex(/^[a-zA-ZÀ-ÿ\s]+(?:[\s-][a-zA-ZÀ-ÿ\s]+)*$/)
    .min(5)
    .max(25)
    .messages({
      'string.min': 'City must have between 5 and 25 characters',
      'string.pattern.base': 'Invalid City',
      'string.max': 'City must have between 5 and 25 characters',
      'string.empty': 'City is required'
    }),
  salary: Joi.number().min(10).max(100).required().messages({
    'any.required': 'Salary is required.',
    'number.min': 'Salary can not be less than 10',
    'number.max': 'Salary can not be more than 100'
  }),
  isActive: Joi.boolean()
});
