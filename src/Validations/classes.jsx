import Joi from 'joi';

const classValidation = Joi.object({
  day: Joi.string()
    .regex(
      /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(,(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*$/
    )
    .messages({
      'string.pattern.base': 'Invalid days. Please use a comma-separated list of valid days.',
      'string.required': 'Day is required',
      'string.empty': 'Day is required'
    }),
  hour: Joi.string()
    .pattern(/^(?:0[8-9]|1[0-9]|2[0-2]):[0-5][0-9]$/)
    .messages({
      'string.pattern': 'Hour must be in H:MM or HH:MM format',
      'string.pattern.base': 'Gym is only open between 08:00 and 22:00',
      'string.required': 'Hour is required',
      'string.empty': 'Hour is required'
    }),
  activity: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      invalid: 'The member id must be a valid ObjectId',
      'string.empty': 'Activity is required'
    }),
  trainer: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      invalid: 'The member id must be a valid ObjectId',
      'string.empty': 'Trainer is required'
    }),
  slots: Joi.number().min(5).max(15).messages({
    'number.min': 'Slots cannot be less than 5',
    'number.max': 'Slots cannot be more than 15',
    'any.required': 'Slots are required',
    'number.empty': 'Slots is required',
    'number.base': 'Slots is required'
  })
});

export default classValidation;
