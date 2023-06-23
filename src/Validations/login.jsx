import Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/)
    .label('Email')
    .messages({
      'string.pattern.base': "Invalid email address format, must finish in '.com'",
      'any.required': 'Email is required.',
      'string.empty': 'Email is required.'
    }),
  password: Joi.string().regex(/.+/).min(8).max(16).label('Password').messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password is required.'
  })
});

export default loginValidation;
