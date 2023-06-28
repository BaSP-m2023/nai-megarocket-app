import Joi from 'joi';

const trainerValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .min(3)
    .max(25)
    .messages({
      'any.required': 'First Name is required',
      'string.pattern.base': 'First Name is invalid, only letters and a space are allowed',
      'string.empty': 'First Name is required',
      'string.base': 'First Name must be a string',
      'string.min': 'First Name too short',
      'string.max': 'First Name is invalid'
    }),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
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

export default trainerValidation;
