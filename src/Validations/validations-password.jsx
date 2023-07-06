import Joi from 'joi';

const validationsPassword = Joi.object({
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
    .label('Password')
    .messages({
      'string.pattern.base': 'Password invalid: Example1!',
      'string.min': 'Password is too short.',
      'string.max': 'Password is too long.',
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.'
    }),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .label('Repeat contraseña')
    .messages({
      'any.only': 'Passwords do not match.',
      'any.required': 'Repeat Password is required.',
      'string.empty': 'Repeat Password is required.'
    })
});

export default validationsPassword;
