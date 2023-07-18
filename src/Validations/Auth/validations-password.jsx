import Joi from 'joi';

const validationsPassword = Joi.object({
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
    }),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .label('Repeat password')
    .messages({
      'any.only': 'Passwords do not match.',
      'any.required': 'Repeat Password is required',
      'string.empty': 'Repeat Password is required'
    })
});

export default validationsPassword;
