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
        'any.required': 'The username is required',
      }),
    email: Joi.string()
    .trim()
    .email({ allowUnicode: false })
    .lowercase()
    .max(128)
    .required()
    .empty(false)
    .messages({
        'string.email': 'Email must be a valid email address and contain only Latin characters',
        'string.empty': 'Email cannot be empty',
        'any.required': 'The email is required',
      }),
    password: Joi.string()
    .trim()
    .min(8)
    .max(128)
    .required()
    .empty(false)
    .messages({
        'string.empty': 'Password cannot be empty or consist only of spaces',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'The password is required',
      }),
  }),
}

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .trim()
      .email({ allowUnicode: false })
      .lowercase()
      .max(128)
      .required()
      .empty(false)
      .messages({
        'string.email': 'Email must be a valid email address and contain only Latin characters',
        'string.empty': 'Email cannot be empty',
        'any.required': 'The email is required',
      }),
    password: Joi.string()
      .trim()
      .min(8)
      .max(128)
      .required()
      .empty(false)
      .messages({
        'string.empty': 'Password cannot be empty or consist only of spaces',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'The password is required',
      }),
  }),
}
