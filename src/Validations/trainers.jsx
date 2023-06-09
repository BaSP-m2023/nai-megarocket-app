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
      'string.empty': 'Email is required',
      'string.pattern.base': 'Email is invalid'
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
      'string.pattern.base': 'Invalid password: Example1!',
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.'
    }),
  salary: Joi.number().min(10).max(100).required().messages({
    'any.required': 'Salary is required.',
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
      'string.empty': 'Name is required.'
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
  dni: Joi.number().integer().greater(99999).less(1000000000).required().messages({
    'number.base': 'the DNI must be a number',
    'number.greater': 'DNI must have at least 7 numbers',
    'number.less': 'DNI cannot have more than 9 numbers'
  }),
  phone: Joi.number().integer().required().messages({
    'number.base': 'Phone must be a number',
    'number.min': 'Phone must have exact 10 numbers'
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
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .min(5)
    .max(25)
    .required()
    .messages({
      'string.min': 'City must have between 5 and 25 characters',
      'string.max': 'City must have between 5 and 25 characters'
    }),
  salary: Joi.number().min(10).max(100).required().messages({
    'any.required': 'Salary is required.',
    'number.min': 'Salary can not be less than 10',
    'number.max': 'Salary can not be more than 100'
  }),
  isActive: Joi.boolean()
});
