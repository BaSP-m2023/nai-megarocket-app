import Joi from 'joi';

const subscriptionValidation = Joi.object({
  classes: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      invalid: 'The classes id must be a valid ObjectId',
      'string.empty': 'Classes is required'
    }),
  member: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      invalid: 'The member id must be a valid ObjectId',
      'string.empty': 'Member is required'
    }),
  date: Joi.date()
});
export default subscriptionValidation;
