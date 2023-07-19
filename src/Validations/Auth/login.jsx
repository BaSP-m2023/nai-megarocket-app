import Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .regex(/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.empty': 'Email is required',
      'string.pattern.base': 'Email is invalid, Spaces are not allowed'
    }),
  password: Joi.string().messages({
    'string.empty': 'Password is required'
  })
});

const recoveryValidation = Joi.object({
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.empty': 'Email is required',
      'string.pattern.base': 'Email is invalid'
    }),
  repeatEmail: Joi.string().trim().valid(Joi.ref('email')).messages({
    'string.empty': 'Email is required',
    'string.pattern.base': 'Email is invalid',
    'any.only': 'Emails must match'
  })
});

export { loginValidation, recoveryValidation };
