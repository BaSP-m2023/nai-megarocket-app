import Joi from 'joi';

const validationsPassword = Joi.object({
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
    .label('Password')
    .messages({
      'string.pattern.base': 'Invalid password: Example1!',
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.'
    }),
  repeatPassword: Joi.string().required()
});

export default validationsPassword;
