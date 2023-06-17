import Joi from 'joi';

const memberValidation = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .messages({
      'string.pattern.base': 'Name must have only letters',
      'any.required': 'Name is required',
      'string.empty': 'Name is required'
    }),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .messages({
      'string.pattern.base': 'Last name must have only letters',
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required.'
    }),
  dni: Joi.number().integer().greater(99999).less(1000000000).messages({
    'number.base': 'the DNI must be a number',
    'number.greater': 'DNI must have at least 7 numbers',
    'number.less': 'DNI cannot have more than 9 numbers',
    'any.empty': 'DNI cannot be empty'
  }),
  phone: Joi.number().integer().messages({
    'number.base': 'Phone must be a number',
    'number.min': 'Phone must have exact 10 numbers',
    'any.empty': 'Phone cannot be empty'
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
    'any.required': 'Postal code cannot be empty'
  }),
  isActive: Joi.boolean(),
  membership: Joi.string().valid('Black', 'Gold', 'Silver').messages({
    'string.valid': 'Please enter a valid membership: Black, Gold or Silver',
    'any.required': 'Membership cannot be empty'
  })
});

export default memberValidation;
