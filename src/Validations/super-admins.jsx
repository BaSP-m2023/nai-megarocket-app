import Joi from 'joi';

const superAdminsValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]*$/)
    .min(3)
    .max(25)
    .messages({
      'any.required': 'Name is required',
      'string.pattern.base': 'Name is invalid, only letters and a space are allowed',
      'string.empty': 'Name is required',
      'string.base': 'Name must be a string',
      'string.min': 'Name too short',
      'string.max': 'Name is invalid'
    }),
  email: Joi.string()
    .trim()
    .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.empty': 'Email is required',
      'string.pattern.base': 'Email is invalid'
    }),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
    .label('Password')
    .messages({
      'string.pattern.base': 'Invalid password: Example1!',
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.'
    })
});

export default superAdminsValidation;
