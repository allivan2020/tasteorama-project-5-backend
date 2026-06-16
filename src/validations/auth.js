import { Joi, Segments } from 'celebrate'

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string()
      .trim()
      .min(2)
      .max(16)
      .required()
      .empty(false)
      .messages({
        'string.empty': 'The username cannot be empty',
      }),
    email: Joi.string().trim().email().lowercase().max(128).required(),
    password: Joi.string()
    .trim()
    .min(8)
    .max(128)
    .required()
    .messages({
        'string.empty': 'Password cannot be empty or consist only of spaces',
        'string.min': 'Password must be at least 8 characters long',
      }),
  }),
}

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().trim().email().lowercase().max(128).required(),
    password: Joi.string().trim().min(8).max(128).required(),
  }),
}
