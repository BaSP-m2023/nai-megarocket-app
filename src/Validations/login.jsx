import Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.empty': 'Email is required',
      'string.pattern.base': 'Email is invalid'
    }),
  password: Joi.string().label('Password').messages({
    'string.pattern.base': 'Invalid password: Example1!',
    'any.required': 'Password is required.',
    'string.empty': 'Password is required.'
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
