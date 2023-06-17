import Joi from 'joi';

const activityValidation = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required.'
  }),
  description: Joi.string().trim().min(5).max(250).required().messages({
    'any.required': 'Description is required.',
    'string.empty': 'Description is required.',
    'string.min': 'Description must have at least 5 characters.'
  }),
  isActive: Joi.boolean()
});

export default activityValidation;
