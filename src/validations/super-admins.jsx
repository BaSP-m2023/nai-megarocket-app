import Joi from 'joi';

const superAdminsValidation = Joi.object({
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
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/)
    .label('Email')
    .messages({
      'string.pattern.base': "Invalid email address format, must finish in '.com'",
      'any.required': 'Email is required.',
      'string.empty': 'Email is required.'
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

export default superAdminsValidation;
