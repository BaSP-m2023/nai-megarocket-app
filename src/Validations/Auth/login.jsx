import Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'Email is invalid',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
    .label('Password')
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.',
      'string.min': 'Password must have at least 8 characters',
      'string.max': 'Password must have less than 16 characters',
      'any.required': 'Password is required',
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
