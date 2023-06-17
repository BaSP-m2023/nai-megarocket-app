import Joi from 'joi';

// const adminsValidation = Joi.object({
//   firstName: Joi.string()
//     .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
//     .trim()
//     .min(3)
//     .max(25)
//     .required()
//     .messages({
//       'string.pattern.base': 'Name must have only letters',
//       'any.required': 'Name is required',
//       'string.empty': 'Name is required.'
//     }),
//   lastName: Joi.string()
//     .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
//     .trim()
//     .min(3)
//     .max(25)
//     .required()
//     .messages({
//       'string.pattern.base': 'Last name must have only letters',
//       'any.required': 'Last name is required',
//       'string.empty': 'Last name is required.'
//     }),
//   dni: Joi.number().integer().greater(99999).less(1000000000).required().messages({
//     'number.base': 'the DNI must be a number',
//     'number.greater': 'DNI must have at least 7 numbers',
//     'number.less': 'DNI cannot have more than 9 numbers'
//   }),
//   phone: Joi.number().integer().required().messages({
//     'number.base': 'Phone must be a number',
//     'number.min': 'Phone must have exact 10 numbers'
//   }),
//   email: Joi.string()
//     .trim()
//     .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
//     .required()
//     .messages({
//       'string.pattern.base': 'The email is invalid'
//     }),
//   city: Joi.string()
//     .trim()
//     .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
//     .min(5)
//     .max(25)
//     .required()
//     .messages({
//       'string.min': 'City must have between 5 and 25 characters',
//       'string.max': 'City must have between 5 and 25 characters'
//     }),
//   password: Joi.string()
//     .min(8)
//     .max(16)
//     .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
//     .required()
//     .messages({
//       'string.pattern.base':
//         'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
//       'any.required': 'Password is required.',
//       'string.empty': 'Password is required.'
//     }),

//   isActive: Joi.boolean()
// });
// 'any.required'       'string.empty'

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
    'number.base': 'the phone number must be a number',
    'number.min': 'the phone number is invalid',
    'number.max': 'the phone number is invalid'
  }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'the email is invalid'
    }),
  city: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .trim()
    .alphanum()
    .min(5)
    .max(25)
    .messages({
      'string.min': 'city is too short',
      'string.max': 'invalid city'
    }),
  password: Joi.string()
    .regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/)
    .trim()
    .min(8)
    .max(20)
    .messages({
      'string.empty': 'the password can not be empty',
      'string.min': 'the password is too short',
      'string.pattern.base':
        'Password must contain at least 1 number, 1 uppercase letter, and 1 lowercase letter'
    })
});

export default adminsValidation;
