import Joi from 'joi';

const subscriptionValidation = Joi.object({
  classes: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      invalid: 'The classes id must be a valid ObjectId'
    }),
  member: Joi.string()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      invalid: 'The member id must be a valid ObjectId'
    }),
  date: Joi.date()
});
export default subscriptionValidation;
