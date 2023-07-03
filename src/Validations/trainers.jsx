import Joi from 'joi';

export const trainerCreateValidation = Joi.object({
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
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.'
    }),
  salary: Joi.number().min(10).max(100).required().messages({
    'any.required': 'Salary is required.',
    'number.min': 'Salary can not be less than 10',
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
