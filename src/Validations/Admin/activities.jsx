import Joi from 'joi';

const activityValidation = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
    .min(3)
    .max(25)
    .messages({
      'any.required': 'Activity is required',
      'string.pattern.base': 'Activity is invalid, only letters and a space are allowed',
      'string.empty': 'Activity is required',
      'string.base': 'Activity must be a string',
      'string.min': 'Activity too short',
      'string.max': 'Activity is invalid'
    }),
  description: Joi.string()
    .trim()
    .min(5)
    .max(250)
    .regex(/^[A-Za-z0-9\s]*$/)
    .required()
    .messages({
      'any.required': 'Description is required.',
      'string.empty': 'Description is required.',
      'string.min': 'Description must have at least 5 characters.'
    }),
  isActive: Joi.boolean()
});

export default activityValidation;
