import Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/)
    .label('Email')
    .messages({
      'string.pattern.base': 'The email is invalid',
      'any.required': 'Email is required.',
      'string.empty': 'Email is required.'
    }),
  password: Joi.string()
    .regex(/.+/)
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

export default loginValidation;
